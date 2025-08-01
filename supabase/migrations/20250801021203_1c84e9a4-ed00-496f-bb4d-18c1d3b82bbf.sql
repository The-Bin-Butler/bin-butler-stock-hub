-- Create or replace function to handle low stock tasks for in-store items
CREATE OR REPLACE FUNCTION public.create_low_stock_task()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  team_leader_id UUID;
  product_supplier_record RECORD;
BEGIN
  -- Check if product is at or below reorder threshold
  IF NEW.current_stock <= COALESCE(NEW.reorder_threshold, 5) AND 
     OLD.current_stock > COALESCE(NEW.reorder_threshold, 5) THEN
    
    -- Get product supplier info to check if it's in_store
    SELECT ps.*, s.supplier_name
    INTO product_supplier_record
    FROM product_suppliers ps
    JOIN suppliers s ON ps.supplier_id = s.id
    WHERE ps.product_id = NEW.id
    AND ps.purchase_method = 'in_store'
    LIMIT 1;
    
    -- Only create task if it's an in-store item
    IF FOUND THEN
      -- Get a team leader to assign the task to
      SELECT ur.user_id INTO team_leader_id
      FROM user_roles ur
      WHERE ur.role IN ('team_leader', 'owner')
      LIMIT 1;
      
      -- Create task for restocking
      INSERT INTO tasks (
        title,
        description,
        status,
        priority,
        assigned_to,
        created_by,
        due_date
      ) VALUES (
        'Restock: ' || NEW.name,
        'Product "' || NEW.name || '" is low on stock (' || NEW.current_stock || ' remaining, threshold: ' || COALESCE(NEW.reorder_threshold, 5) || '). Please visit ' || product_supplier_record.supplier_name || ' to restock this in-store item.',
        'pending',
        'high',
        team_leader_id,
        team_leader_id,
        CURRENT_DATE + INTERVAL '1 day'
      );
      
      -- Log the task creation
      INSERT INTO automation_log_entries (
        name,
        description,
        trigger_type,
        status,
        tables_involved
      ) VALUES (
        'Low Stock Task Creation',
        'Created restocking task for in-store product: ' || NEW.name,
        'stock_level_change',
        'completed',
        ARRAY['products', 'tasks', 'product_suppliers']
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for low stock task creation
DROP TRIGGER IF EXISTS create_low_stock_task_trigger ON products;
CREATE TRIGGER create_low_stock_task_trigger
  AFTER UPDATE OF current_stock ON products
  FOR EACH ROW
  EXECUTE FUNCTION create_low_stock_task();