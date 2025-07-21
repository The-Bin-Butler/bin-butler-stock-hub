
-- Drop the existing foreign key constraint on stock_movements.user_id that references employees
ALTER TABLE public.stock_movements DROP CONSTRAINT IF EXISTS stock_movements_user_id_fkey;

-- Add a new foreign key constraint that references auth.users instead
ALTER TABLE public.stock_movements 
ADD CONSTRAINT stock_movements_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update the RLS policies to ensure they work correctly with the new foreign key structure
-- Drop existing policies first
DROP POLICY IF EXISTS "Staff can create usage movements" ON public.stock_movements;
DROP POLICY IF EXISTS "Team leaders can create any movements" ON public.stock_movements;
DROP POLICY IF EXISTS "Owners can create any movements" ON public.stock_movements;
DROP POLICY IF EXISTS "Users can view their own stock movements" ON public.stock_movements;
DROP POLICY IF EXISTS "Owners can view all stock movements" ON public.stock_movements;

-- Recreate the policies with the correct logic
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

CREATE POLICY "Owners can create any movements"
ON public.stock_movements
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Users can view their own stock movements"
ON public.stock_movements
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'team_leader') OR public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Owners can view all stock movements"
ON public.stock_movements
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'owner'));
