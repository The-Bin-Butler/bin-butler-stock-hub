-- Add 'adjustment' as a valid movement type
-- First check what constraint exists
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname LIKE '%movement_type%';