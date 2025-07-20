-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('staff', 'team_leader');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

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

-- Create profiles table for additional user info
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create policies for user_roles (only team_leaders can manage roles)
CREATE POLICY "Team leaders can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

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

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create suppliers table
CREATE TABLE public.suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    store_address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on suppliers
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    category TEXT,
    current_stock INTEGER DEFAULT 0,
    reorder_threshold INTEGER DEFAULT 10,
    default_order_quantity INTEGER DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create product_suppliers junction table
CREATE TABLE public.product_suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
    cost DECIMAL(10,2),
    purchase_method TEXT, -- 'online', 'phone', 'in_store', etc.
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(product_id, supplier_id)
);

-- Enable RLS on product_suppliers
ALTER TABLE public.product_suppliers ENABLE ROW LEVEL SECURITY;

-- Create stock_movements table
CREATE TABLE public.stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    movement_type TEXT NOT NULL, -- 'usage', 'restock', 'adjustment'
    quantity INTEGER NOT NULL, -- positive for additions, negative for usage
    unit_cost DECIMAL(10,2), -- cost per unit (for restocking)
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on stock_movements
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;

-- Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'placed', 'received', 'cancelled'
    order_date DATE DEFAULT CURRENT_DATE,
    expected_delivery_date DATE,
    total_cost DECIMAL(10,2),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for suppliers (team leaders only)
CREATE POLICY "Team leaders can manage suppliers"
ON public.suppliers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Create policies for products
CREATE POLICY "All authenticated users can view products"
ON public.products
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Team leaders can manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Create policies for product_suppliers (team leaders only)
CREATE POLICY "Team leaders can manage product suppliers"
ON public.product_suppliers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Create policies for stock_movements
CREATE POLICY "Users can view their own stock movements"
ON public.stock_movements
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'team_leader'));

CREATE POLICY "Staff can create usage movements"
ON public.stock_movements
FOR INSERT
TO authenticated
WITH CHECK (
    user_id = auth.uid() 
    AND movement_type = 'usage' 
    AND quantity < 0
);

CREATE POLICY "Team leaders can create any movements"
ON public.stock_movements
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'team_leader'));

-- Create policies for orders (team leaders only)
CREATE POLICY "Team leaders can manage orders"
ON public.orders
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Create policies for order_items (team leaders only)
CREATE POLICY "Team leaders can manage order items"
ON public.order_items
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'team_leader'));

-- Create function to update product stock on movement
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

-- Create trigger to update stock on movement
CREATE TRIGGER update_stock_on_movement
    AFTER INSERT ON public.stock_movements
    FOR EACH ROW
    EXECUTE FUNCTION public.update_product_stock();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON public.suppliers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial common products
INSERT INTO public.products (name, sku, category, current_stock, reorder_threshold, default_order_quantity) VALUES
('Disposable Gloves', 'GLV-001', 'Safety Equipment', 100, 20, 50),
('Bin Bags (Large)', 'BAG-L01', 'Bags', 200, 30, 100),
('Bin Bags (Small)', 'BAG-S01', 'Bags', 150, 25, 100),
('Microfiber Cloths', 'CLT-001', 'Cleaning Supplies', 50, 10, 25),
('Mop Heads', 'MOP-001', 'Cleaning Equipment', 20, 5, 10),
('All-Purpose Cleaner', 'CHM-001', 'Chemicals', 30, 8, 15),
('Disinfectant Spray', 'CHM-002', 'Chemicals', 25, 6, 12),
('Toilet Paper', 'PAP-001', 'Paper Products', 80, 15, 40);