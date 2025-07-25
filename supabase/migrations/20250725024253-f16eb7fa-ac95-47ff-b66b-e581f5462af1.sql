-- Add 'adjustment' to the valid movement types
ALTER TABLE stock_movements 
DROP CONSTRAINT IF EXISTS stock_movements_movement_type_check;

ALTER TABLE stock_movements 
ADD CONSTRAINT stock_movements_movement_type_check 
CHECK (movement_type = ANY (ARRAY['in'::text, 'out'::text, 'usage'::text, 'adjustment'::text]));