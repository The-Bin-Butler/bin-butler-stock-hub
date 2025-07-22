-- Populate missing product_supplier relationships
-- Assign Gloves to Gleam It (first one)
INSERT INTO product_suppliers (product_id, supplier_id, cost, purchase_method)
SELECT 
    '54edf37a-9905-49b1-9c20-506effa4ec4f'::uuid, 
    'e5dcb922-7b26-4b9f-946f-b5cc6e29e7ff'::uuid, 
    15.00, 
    'in_store'::purchase_method_enum
WHERE NOT EXISTS (
    SELECT 1 FROM product_suppliers 
    WHERE product_id = '54edf37a-9905-49b1-9c20-506effa4ec4f'::uuid
);

-- Assign Mop Head to Gleam It (first one)
INSERT INTO product_suppliers (product_id, supplier_id, cost, purchase_method)
SELECT 
    'e0a51557-0cd4-4a67-9272-82a88cd95284'::uuid, 
    'e5dcb922-7b26-4b9f-946f-b5cc6e29e7ff'::uuid, 
    8.50, 
    'in_store'::purchase_method_enum
WHERE NOT EXISTS (
    SELECT 1 FROM product_suppliers 
    WHERE product_id = 'e0a51557-0cd4-4a67-9272-82a88cd95284'::uuid
);

-- Assign Microfibre cloths to MicroFibre World (more appropriate supplier)
INSERT INTO product_suppliers (product_id, supplier_id, cost, purchase_method)
SELECT 
    '1df22558-88be-42fa-ba3b-cfa92fc6e65b'::uuid, 
    '74a1d5a6-dcb4-4a83-94b7-fc16455bee00'::uuid, 
    12.00, 
    'online'::purchase_method_enum
WHERE NOT EXISTS (
    SELECT 1 FROM product_suppliers 
    WHERE product_id = '1df22558-88be-42fa-ba3b-cfa92fc6e65b'::uuid
);