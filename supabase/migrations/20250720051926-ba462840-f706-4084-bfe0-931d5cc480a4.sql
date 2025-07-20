-- Add current_stock column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS current_stock INTEGER DEFAULT 0;

-- Update stock for existing products with some sample quantities
UPDATE public.products 
SET current_stock = CASE 
  WHEN name LIKE '%Gloves%' THEN 150
  WHEN name LIKE '%Bin Bags%' THEN 200
  WHEN name LIKE '%mop%' THEN 25
  WHEN name LIKE '%Microfiber%' OR name LIKE '%microfibre%' THEN 75
  WHEN name LIKE '%Cleaner%' OR name LIKE '%Chemical%' THEN 40
  ELSE 50
END
WHERE current_stock = 0;

-- Create a view to calculate real-time stock levels based on movements
CREATE OR REPLACE VIEW public.products_with_stock AS
SELECT 
  p.*,
  COALESCE(p.current_stock, 0) + COALESCE(sm.total_movements, 0) as calculated_stock
FROM public.products p
LEFT JOIN (
  SELECT 
    product_id,
    SUM(quantity) as total_movements
  FROM public.stock_movements
  GROUP BY product_id
) sm ON p.id = sm.product_id;