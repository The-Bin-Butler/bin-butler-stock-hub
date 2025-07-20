-- Add missing columns to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS current_stock INTEGER DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update stock for existing products with some sample quantities
UPDATE public.products 
SET current_stock = CASE 
  WHEN name LIKE '%Gloves%' THEN 150
  WHEN name LIKE '%Bin Bags%' THEN 200
  WHEN name LIKE '%mop%' THEN 25
  WHEN name LIKE '%Microfiber%' OR name LIKE '%microfibre%' THEN 75
  WHEN name LIKE '%Cleaner%' OR name LIKE '%Chemical%' THEN 40
  ELSE 50
END,
updated_at = now()
WHERE current_stock = 0;