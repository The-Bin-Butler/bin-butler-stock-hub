-- Update the movement_type check constraint to include 'usage'
ALTER TABLE public.stock_movements 
DROP CONSTRAINT stock_movements_movement_type_check;

ALTER TABLE public.stock_movements 
ADD CONSTRAINT stock_movements_movement_type_check 
CHECK (movement_type = ANY (ARRAY['in'::text, 'out'::text, 'usage'::text]));