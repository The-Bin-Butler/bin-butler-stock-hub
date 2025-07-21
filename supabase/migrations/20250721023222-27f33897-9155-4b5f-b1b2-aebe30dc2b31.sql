-- Add RLS policy to allow owners to create any stock movements
CREATE POLICY "Owners can create any movements" 
ON public.stock_movements 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'owner'::app_role));

-- Also allow owners to view all stock movements  
CREATE POLICY "Owners can view all stock movements" 
ON public.stock_movements 
FOR SELECT 
USING (has_role(auth.uid(), 'owner'::app_role));