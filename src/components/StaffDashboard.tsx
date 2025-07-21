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
import { useToast } from '@/hooks/use-toast';
import { Minus, Package2, Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  current_stock: number;
  category: string;
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

export default function StaffDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [recentMovements, setRecentMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  // Common products for quick access - these will be fetched from the database
  const [quickAccessProducts, setQuickAccessProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, current_stock, category')
        .order('name');

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
      const response = await (supabase as any)
        .from('products')
        .select('id, name, current_stock, category')
        .eq('is_common', true)
        .order('name');

      console.log('Quick access products query result:', response);
      if (response.error) throw response.error;
      setQuickAccessProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching quick access products:', error);
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
    }
  }, [user?.id]);


  const handleQuickUse = async (productId: string, productName: string) => {
    console.log('Quick use clicked:', productName, productId);
    await logUsage(productId, 1, `Quick use: ${productName}`);
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
                onClick={() => handleQuickUse(product.id, product.name)}
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
                <Label htmlFor="quantity">Quantity Used</Label>
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
    </div>
  );
}