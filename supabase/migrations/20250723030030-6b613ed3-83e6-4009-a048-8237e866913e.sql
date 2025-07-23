
-- Update the check_low_stock_automation function to pass sku information
CREATE OR REPLACE FUNCTION public.check_low_stock_automation()
RETURNS TRIGGER AS $$
DECLARE
  automation_enabled BOOLEAN;
  product_supplier_record RECORD;
BEGIN
  -- Check if automation is enabled
  SELECT enabled INTO automation_enabled 
  FROM automation_settings 
  WHERE automation_type = 'low_stock_reorder' 
  LIMIT 1;
  
  IF automation_enabled IS NULL OR NOT automation_enabled THEN
    RETURN NEW;
  END IF;
  
  -- Check if product is at or below reorder threshold
  IF NEW.current_stock <= COALESCE(NEW.reorder_threshold, 5) THEN
    -- Get product supplier info for email/SMS ordering
    SELECT ps.*, s.supplier_name, s.contact_email, s.contact_phone
    INTO product_supplier_record
    FROM product_suppliers ps
    JOIN suppliers s ON ps.supplier_id = s.id
    WHERE ps.product_id = NEW.id
    AND ps.purchase_method IN ('email', 'sms')
    LIMIT 1;
    
    IF FOUND THEN
      -- Log the automation trigger with enhanced product info including SKU
      INSERT INTO automation_log_entries (
        name,
        description,
        trigger_type,
        status,
        tables_involved
      ) VALUES (
        'Low Stock Reorder',
        'Product ' || NEW.name || ' (SKU: ' || COALESCE(NEW.sku, 'N/A') || ') is low on stock (' || NEW.current_stock || ' remaining, threshold: ' || COALESCE(NEW.reorder_threshold, 5) || ')',
        'stock_level_change',
        'pending',
        ARRAY['products', 'product_suppliers', 'suppliers']
      );
      
      -- Note: The actual HighLevel API call will be made by the edge function
      -- This trigger just logs the event for now
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update automation settings with the new email template
INSERT INTO automation_settings (automation_type, enabled, settings)
VALUES (
  'low_stock_reorder',
  true,
  '{
    "default_email_template": "Please can we place an order for {default_order_quantity} {product_name} ({sku}). Please confirm receipt of order via return email. Stock should be shipped to 39 Bailey Crescent Southport we are in the yard space next to unit 8 and stock can be left outside the gate. Thank You",
    "default_sms_template": "REORDER: {default_order_quantity} {product_name} ({sku}) - Stock: {current_stock}/{threshold}. Please confirm order receipt."
  }'::jsonb
)
ON CONFLICT (automation_type) DO UPDATE SET
  settings = EXCLUDED.settings,
  updated_at = now();
