-- Create table for OAuth tokens
CREATE TABLE public.oauth_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'highlevel',
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  token_type TEXT DEFAULT 'Bearer',
  scope TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy for system access only (no user access needed for OAuth tokens)
CREATE POLICY "System can manage oauth tokens" 
ON public.oauth_tokens 
FOR ALL 
USING (false);

-- Create table for automation settings
CREATE TABLE public.automation_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_type TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.automation_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for team leaders to manage automation settings
CREATE POLICY "Team leaders can manage automation settings" 
ON public.automation_settings 
FOR ALL 
USING (has_role(auth.uid(), 'team_leader'::app_role));

-- Add trigger for updated_at on oauth_tokens
CREATE TRIGGER update_oauth_tokens_updated_at
BEFORE UPDATE ON public.oauth_tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at on automation_settings
CREATE TRIGGER update_automation_settings_updated_at
BEFORE UPDATE ON public.automation_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to check low stock and trigger automation
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
      -- Log the automation trigger
      INSERT INTO automation_log_entries (
        name,
        description,
        trigger_type,
        status,
        tables_involved
      ) VALUES (
        'Low Stock Reorder',
        'Product ' || NEW.name || ' is low on stock (' || NEW.current_stock || ' remaining, threshold: ' || COALESCE(NEW.reorder_threshold, 5) || ')',
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

-- Create trigger on products table for stock changes
CREATE TRIGGER check_low_stock_trigger
AFTER UPDATE OF current_stock ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.check_low_stock_automation();