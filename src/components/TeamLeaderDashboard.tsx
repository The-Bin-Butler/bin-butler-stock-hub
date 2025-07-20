import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useUserRoles } from '@/hooks/useUserRoles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AddStockModal from '@/components/AddStockModal';
import { 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  Users, 
  ClipboardList,
  Plus,
  Loader2 
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  current_stock: number;
  reorder_threshold: number;
  category: string;
}

interface StockMovement {
  id: string;
  quantity: number;
  movement_type: string;
  created_at: string;
  notes: string;
  products: {
    name: string;
  };
}

interface Order {
  id: string;
  status: string;
  created_at: string;
  notes: string;
  suppliers: {
    supplier_name: string;
  } | null;
}

export default function TeamLeaderDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { canManageInventory, isLoading: rolesLoading } = useUserRoles();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [recentMovements, setRecentMovements] = useState<StockMovement[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, current_stock, reorder_threshold, category')
        .order('name');

      if (productsError) throw productsError;

      // Fetch recent stock movements
      const { data: movementsData, error: movementsError } = await supabase
        .from('stock_movements')
        .select(`
          id,
          quantity,
          movement_type,
          created_at,
          notes,
          products (name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (movementsError) throw movementsError;

      // Fetch recent orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          status,
          created_at,
          notes,
          suppliers (supplier_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (ordersError) throw ordersError;

      setProducts(productsData || []);
      setRecentMovements(movementsData || []);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStockSuccess = () => {
    fetchDashboardData(); // Refresh the dashboard data
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.current_stock <= product.reorder_threshold);
  };

  const getTotalStockValue = () => {
    return products.reduce((total, product) => total + product.current_stock, 0);
  };

  const getRecentUsage = () => {
    const usageMovements = recentMovements.filter(m => m.movement_type === 'usage');
    return Math.abs(usageMovements.reduce((total, movement) => total + movement.quantity, 0));
  };

  if (loading || rolesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!canManageInventory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access this dashboard.</p>
        </div>
      </div>
    );
  }

  const lowStockProducts = getLowStockProducts();
  const totalStockValue = getTotalStockValue();
  const recentUsage = getRecentUsage();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Team Leader Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Comprehensive overview of stock levels, orders, and team activity
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              {totalStockValue} total items in stock
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Products below reorder threshold
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentUsage}</div>
            <p className="text-xs text-muted-foreground">
              Items used in recent activities
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Orders awaiting processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="shadow-soft border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span>Low Stock Alert</span>
            </CardTitle>
            <CardDescription>
              The following products are running low and may need restocking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Category: {product.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">
                      {product.current_stock} left
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Reorder at: {product.reorder_threshold}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common management tasks and functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {canManageInventory && (
              <Button 
                variant="outline" 
                size="lg" 
                className="h-auto p-4 flex flex-col space-y-2"
                onClick={() => setIsAddStockModalOpen(true)}
              >
                <Plus className="h-6 w-6" />
                <span>Add Stock</span>
              </Button>
            )}
            {canManageInventory && (
              <Button 
                variant="outline" 
                size="lg" 
                className="h-auto p-4 flex flex-col space-y-2"
                onClick={() => navigate("/new-product")}
              >
                <Package className="h-6 w-6" />
                <span>New Product</span>
              </Button>
            )}
            {canManageInventory && (
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col space-y-2">
                <ClipboardList className="h-6 w-6" />
                <span>Create Order</span>
              </Button>
            )}
            {canManageInventory && (
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Staff</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Stock Movements</CardTitle>
            <CardDescription>
              Latest stock activity across all products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMovements.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No recent stock movements
                </p>
              ) : (
                recentMovements.slice(0, 5).map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{movement.products.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(movement.created_at).toLocaleDateString()} •{' '}
                        {movement.movement_type}
                      </p>
                      {movement.notes && (
                        <p className="text-xs text-muted-foreground italic">"{movement.notes}"</p>
                      )}
                    </div>
                    <Badge 
                      variant={movement.quantity > 0 ? 'default' : 'destructive'}
                    >
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest order status and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No recent orders
                </p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">
                        {order.suppliers?.supplier_name || 'Unknown Supplier'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                        {order.notes && ` • ${order.notes}`}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        order.status === 'pending' ? 'secondary' :
                        order.status === 'placed' ? 'default' :
                        order.status === 'received' ? 'default' :
                        'destructive'
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onSuccess={handleAddStockSuccess}
      />
    </div>
  );
}
