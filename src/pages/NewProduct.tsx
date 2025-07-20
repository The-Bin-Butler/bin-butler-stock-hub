import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus } from "lucide-react";
import Layout from "@/components/Layout";
import { SupplierModal } from "@/components/SupplierModal";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().optional(),
  sku: z.string().optional(),
  reorder_threshold: z.number().min(0).optional(),
  default_order_quantity: z.number().min(1).optional(),
  notes: z.string().optional(),
  initial_stock: z.number().min(0).optional(),
  is_common: z.boolean().default(false),
  supplier_id: z.string().min(1, "Please select a supplier"),
  cost: z.number().min(0, "Cost must be greater than 0"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Supplier {
  id: string;
  supplier_name: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  purchase_method: string;
  store_address?: string;
}

export default function NewProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      sku: "",
      reorder_threshold: 10,
      default_order_quantity: 20,
      notes: "",
      initial_stock: 0,
      is_common: false,
      supplier_id: "",
      cost: 0,
    },
  });

  const loadSuppliers = async () => {
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("supplier_name");

    if (error) {
      console.error("Error loading suppliers:", error);
      return;
    }

    setSuppliers(data || []);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create products",
          variant: "destructive",
        });
        return;
      }

      // Create the product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: data.name,
          category: data.category || null,
          sku: data.sku || null,
          reorder_threshold: data.reorder_threshold || null,
          default_order_quantity: data.default_order_quantity || null,
          notes: data.notes || null,
          current_stock: data.initial_stock || 0,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Create product-supplier relationship
      const { error: productSupplierError } = await supabase
        .from("product_suppliers")
        .insert({
          product_id: product.id,
          supplier_id: data.supplier_id,
          cost: data.cost,
          purchase_method: (suppliers.find(s => s.id === data.supplier_id)?.purchase_method || 'in_store') as any,
        });

      if (productSupplierError) throw productSupplierError;

      // Create initial stock movement if initial_stock is provided
      if (data.initial_stock && data.initial_stock > 0) {
        const { error: stockError } = await supabase
          .from("stock_movements")
          .insert({
            product_id: product.id,
            movement_type: "restock",
            quantity: data.initial_stock,
            user_id: user.id,
            notes: "Initial stock on creation",
          });

        if (stockError) throw stockError;
      }

      toast({
        title: "Success",
        description: "Product created successfully",
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSupplierCreated = (newSupplier: Supplier) => {
    setSuppliers(prev => [...prev, newSupplier]);
    form.setValue("supplier_id", newSupplier.id);
    setIsSupplierModalOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">New Product</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter SKU" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reorder_threshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reorder Threshold</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="default_order_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Order Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="20"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="initial_stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Usage info, special instructions, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_common"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Common Product</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Show on dashboards for quick access
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Supplier Information</h3>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="supplier_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Supplier *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select supplier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {suppliers.map((supplier) => (
                                  <SelectItem key={supplier.id} value={supplier.id}>
                                    {supplier.supplier_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="mt-8"
                      onClick={() => setIsSupplierModalOpen(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost per Unit *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "Creating..." : "Create Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <SupplierModal
          isOpen={isSupplierModalOpen}
          onClose={() => setIsSupplierModalOpen(false)}
          onSupplierCreated={handleSupplierCreated}
        />
      </div>
    </Layout>
  );
}