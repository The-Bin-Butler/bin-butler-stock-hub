import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Minus, Package2, Loader2, Bell } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  current_stock: number;
  category: string;
  unit_type: string | null;
}

interface StockMovement {
  id: string;
  quantity: number;
  notes: string;
  created_at: string;
  products: {
    name: string;
  };
}

interface ProductNotice {
  id: string;
  name: string;
  purchase_method: string;
  supplier_name: string;
  current_stock: number;
  reorder_threshold: number;
}

export default function StaffDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [recentMovements, setRecentMovements] = useState<StockMovement[]>([]);
  const [productNotices, setProductNotices] = useState<ProductNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  
  // Quick use modal state
  const [quickUseModal, setQuickUseModal] = useState<{ open: boolean; product: Product | null }>({
    open: false,
    product: null
  });
  const [quickUseQuantity, setQuickUseQuantity] = useState<number>(1);
  const [quickAccessProducts, setQuickAccessProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, current_stock, category, unit_type')
        .order('name') as any;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    }
  };

  const fetchQuickAccessProducts = async () => {
    try {
      console.log('Fetching quick access products...');
      const response = await supabase
        .from('products')
        .select('id, name, current_stock, category, unit_type')
        .eq('is_common', true)
        .order('name') as any;

      console.log('Quick access products query result:', response);
      if (response.error) throw response.error;
      setQuickAccessProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching quick access products:', error);
    }
  };

  const fetchProductNotices = async () => {
    try {
      const { data: noticesData, error: noticesError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          current_stock,
          reorder_threshold,
          product_suppliers!inner (
            purchase_method,
            suppliers (supplier_name)
          )
        `)
        .in('product_suppliers.purchase_method', ['in_store', 'online']);

      if (noticesError) throw noticesError;

      // Transform the notices data
      const transformedNotices = noticesData?.map(product => ({
        id: product.id,
        name: product.name,
        current_stock: product.current_stock,
        reorder_threshold: product.reorder_threshold,
        purchase_method: product.product_suppliers[0]?.purchase_method || '',
        supplier_name: product.product_suppliers[0]?.suppliers?.supplier_name || 'Unknown'
      })) || [];

      setProductNotices(transformedNotices);
    } catch (error) {
      console.error('Error fetching product notices:', error);
    }
  };

  const fetchRecentMovements = async () => {
    try {
      const { data, error } = await supabase
        .from('stock_movements')
        .select(`
          id,
          quantity,
          notes,
          created_at,
          products (name)
        `)
        .eq('user_id', user?.id)
        .eq('movement_type', 'usage')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentMovements(data || []);
    } catch (error) {
      console.error('Error fetching recent movements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProducts();
      fetchQuickAccessProducts();
      fetchRecentMovements();
      fetchProductNotices();
    }
  }, [user?.id]);

  const handleQuickUse = (product: Product) => {
    setQuickUseModal({ open: true, product });
    setQuickUseQuantity(1);
  };

  const handleQuickUseSubmit = async () => {
    if (!quickUseModal.product) return;
    
    await logUsage(
      quickUseModal.product.id, 
      quickUseQuantity, 
      `Quick use: ${quickUseModal.product.name}`
    );
    
    setQuickUseModal({ open: false, product: null });
  };

  const handleSubmitUsage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || quantity <= 0) return;

    await logUsage(selectedProduct, quantity, notes);
  };

  const logUsage = async (productId: string, qty: number, usageNotes: string) => {
    setSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('stock_movements')
        .insert({
          product_id: productId,
          user_id: user?.id,
          movement_type: 'usage',
          quantity: -qty, // Negative for usage
          notes: usageNotes,
        });

      if (error) throw error;

      toast({
        title: "Usage Logged",
        description: `Successfully logged usage of ${qty} items`,
      });

      // Reset form
      setSelectedProduct('');
      setQuantity(1);
      setNotes('');

      // Refresh data
      fetchProducts();
      fetchQuickAccessProducts();
      fetchRecentMovements();
    } catch (error) {
      console.error('Error logging usage:', error);
      toast({
        title: "Error",
        description: "Failed to log usage",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Staff Dashboard</h2>
        <p className="text-muted-foreground mt-2">Log your stock usage quickly and easily</p>
      </div>

      {/* Important Notices */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Important Notices</span>
          </CardTitle>
          <CardDescription>
            Items requiring attention for restocking
          </CardDescription>
        </CardHeader>
        <CardContent>
          {productNotices.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No important notices at this time.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {productNotices.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Supplier: {product.supplier_name} • Purchase method: {product.purchase_method}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={product.current_stock <= product.reorder_threshold ? "destructive" : "outline"}>
                      {product.current_stock} items left
                    </Badge>
                    {product.current_stock <= product.reorder_threshold && (
                      <p className="text-xs text-destructive mt-1 font-medium">
                        Needs manual ordering!
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Access Buttons */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package2 className="h-5 w-5 text-primary" />
            <span>Quick Use Items</span>
          </CardTitle>
          <CardDescription>
            Tap to quickly log usage of common items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickAccessProducts.map((product) => (
              <Button
                key={product.id}
                variant="outline"
                size="lg"
                className="h-auto p-4 flex flex-col space-y-2 hover:shadow-soft transition-all"
                onClick={() => handleQuickUse(product)}
                disabled={submitting}
              >
                <span className="font-medium text-center text-sm">{product.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {product.current_stock} in stock
                </Badge>
              </Button>
            ))}
            {quickAccessProducts.length === 0 && (
              <div className="col-span-full text-center py-4 text-muted-foreground">
                No common items found. Mark products as "Quick Use" when adding them.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Manual Usage Form */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Minus className="h-5 w-5 text-primary" />
            <span>Log Stock Usage</span>
          </CardTitle>
          <CardDescription>
            Record usage of any item with optional notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitUsage} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <select
                  id="product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a product...</option>
                  {products.map((product) => (
                  <option key={product.id} value={product.id}>
                      {product.name} ({product.current_stock} in stock)
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity Used
                  {selectedProduct && products.find(p => p.id === selectedProduct)?.unit_type && (
                    <span className="text-muted-foreground ml-1">
                      ({products.find(p => p.id === selectedProduct)?.unit_type})
                    </span>
                  )}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this usage..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-elegant transition-all"
              disabled={submitting || !selectedProduct}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging Usage...
                </>
              ) : (
                'Log Usage'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Your Recent Activity</CardTitle>
          <CardDescription>
            Your last 5 stock usage entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentMovements.length === 0 ? (
            <Alert>
              <AlertDescription>
                No recent usage logged. Start using the buttons above to track your stock usage.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{movement.products.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Used {Math.abs(movement.quantity)} • {new Date(movement.created_at).toLocaleString()}
                    </p>
                    {movement.notes && (
                      <p className="text-sm text-muted-foreground italic">"{movement.notes}"</p>
                    )}
                  </div>
                  <Badge variant="outline">
                    -{Math.abs(movement.quantity)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Use Modal */}
      <Dialog open={quickUseModal.open} onOpenChange={(open) => setQuickUseModal({ open, product: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Use: {quickUseModal.product?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quick-quantity">
                Quantity Used
                {quickUseModal.product?.unit_type && (
                  <span className="text-muted-foreground ml-1">
                    ({quickUseModal.product.unit_type})
                  </span>
                )}
              </Label>
              <Input
                id="quick-quantity"
                type="number"
                min="1"
                value={quickUseQuantity}
                onChange={(e) => setQuickUseQuantity(parseInt(e.target.value) || 1)}
                placeholder={`Enter quantity used${quickUseModal.product?.unit_type ? ` (${quickUseModal.product.unit_type})` : ''}`}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setQuickUseModal({ open: false, product: null })}>
                Cancel
              </Button>
              <Button onClick={handleQuickUseSubmit} disabled={submitting}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Log Usage
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}