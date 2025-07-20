-- Create user roles enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('staff', 'team_leader');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles if not already enabled
DO $$ BEGIN
    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN others THEN null;
END $$;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create profiles table for additional user info if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles if not already enabled
DO $$ BEGIN
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN others THEN null;
END $$;

-- Create policies for profiles (drop if exists and recreate to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create policies for user_roles (only team_leaders can manage roles)
DROP POLICY IF EXISTS "Team leaders can view all roles" ON public.user_roles;
CREATE POLICY "Team leaders can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

DROP POLICY IF EXISTS "Team leaders can manage roles" ON public.user_roles;
CREATE POLICY "Team leaders can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'last_name', '')
  );
  
  -- Default role is staff
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'staff');
  
  RETURN new;
END;
$$;

-- Create trigger for new user registration (drop if exists first)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update policies for existing tables to work with our new role system

-- Update suppliers policies (team leaders only)
DROP POLICY IF EXISTS "Team leaders can manage suppliers" ON public.suppliers;
CREATE POLICY "Team leaders can manage suppliers"
ON public.suppliers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Update products policies  
DROP POLICY IF EXISTS "All authenticated users can view products" ON public.products;
CREATE POLICY "All authenticated users can view products"
ON public.products
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Team leaders can manage products" ON public.products;
CREATE POLICY "Team leaders can manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Update product_suppliers policies (team leaders only)
DROP POLICY IF EXISTS "Team leaders can manage product suppliers" ON public.product_suppliers;
CREATE POLICY "Team leaders can manage product suppliers"
ON public.product_suppliers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Update stock_movements policies
DROP POLICY IF EXISTS "Users can view their own stock movements" ON public.stock_movements;
CREATE POLICY "Users can view their own stock movements"
ON public.stock_movements
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'team_leader'));

DROP POLICY IF EXISTS "Staff can create usage movements" ON public.stock_movements;
CREATE POLICY "Staff can create usage movements"
ON public.stock_movements
FOR INSERT
TO authenticated
WITH CHECK (
    user_id = auth.uid() 
    AND movement_type = 'usage' 
    AND quantity < 0
);

DROP POLICY IF EXISTS "Team leaders can create any movements" ON public.stock_movements;
CREATE POLICY "Team leaders can create any movements"
ON public.stock_movements
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'team_leader'));

-- Update orders policies (team leaders only)
DROP POLICY IF EXISTS "Team leaders can manage orders" ON public.orders;
CREATE POLICY "Team leaders can manage orders"
ON public.orders
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Function to update product stock on movement
CREATE OR REPLACE FUNCTION public.update_product_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.products
    SET 
        current_stock = current_stock + NEW.quantity,
        updated_at = now()
    WHERE id = NEW.product_id;
    
    RETURN NEW;
END;
$$;

-- Create trigger to update stock on movement (drop if exists first)
DROP TRIGGER IF EXISTS update_stock_on_movement ON public.stock_movements;
CREATE TRIGGER update_stock_on_movement
    AFTER INSERT ON public.stock_movements
    FOR EACH ROW
    EXECUTE FUNCTION public.update_product_stock();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at (drop if exists first)
DROP TRIGGER IF EXISTS update_suppliers_updated_at ON public.suppliers;
CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON public.suppliers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();