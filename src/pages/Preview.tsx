import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Package, TrendingUp, Users, ClipboardList, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
const PreviewLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <div className="min-h-screen bg-gradient-subtle">
      {/* Header with preview banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">Preview Mode - </span>
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              Sign up to access full features
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mock header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg shadow-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary-foreground">
                <path d="M3 6h18l-2 13H5L3 6Z" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">The Bin Butler</span>
              <span className="text-sm text-muted-foreground">Stock Hub</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="capitalize">Preview Mode</Badge>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        {children}
      </main>
    </div>;
};
const Preview = () => {
  return <PreviewLayout>
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
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                156 total items in stock
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
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
              <div className="text-2xl font-bold">42</div>
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
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Orders awaiting processing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
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
              {[{
              name: "Cleaning Gloves",
              category: "Safety Equipment",
              stock: 5,
              threshold: 10
            }, {
              name: "Bin Liners - Large",
              category: "Consumables",
              stock: 12,
              threshold: 25
            }, {
              name: "Disinfectant Spray",
              category: "Cleaning Supplies",
              stock: 3,
              threshold: 8
            }].map((product, index) => <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Category: {product.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">
                      {product.stock} left
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Reorder at: {product.threshold}
                    </p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common management tasks and functions (Sign up to access)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col space-y-2" disabled>
                <Plus className="h-6 w-6" />
                <span>Add Stock</span>
              </Button>
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col space-y-2" disabled>
                <Package className="h-6 w-6" />
                <span>New Product</span>
              </Button>
              <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col space-y-2" disabled>
                <ClipboardList className="h-6 w-6" />
                <span>Create Order</span>
              </Button>
              
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
                {[{
                product: "Cleaning Gloves",
                type: "usage",
                quantity: -5,
                date: "Today"
              }, {
                product: "Bin Liners - Large",
                type: "restock",
                quantity: +50,
                date: "Yesterday"
              }, {
                product: "Disinfectant Spray",
                type: "usage",
                quantity: -2,
                date: "2 days ago"
              }].map((movement, index) => <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{movement.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {movement.date} • {movement.type}
                      </p>
                    </div>
                    <Badge variant={movement.quantity > 0 ? 'default' : 'destructive'}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </Badge>
                  </div>)}
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
                {[{
                supplier: "CleanCorp Supplies",
                status: "pending",
                date: "Today"
              }, {
                supplier: "Safety First Ltd",
                status: "received",
                date: "Yesterday"
              }, {
                supplier: "Industrial Solutions",
                status: "placed",
                date: "3 days ago"
              }].map((order, index) => <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{order.supplier}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <Badge variant={order.status === 'pending' ? 'secondary' : order.status === 'placed' ? 'default' : 'default'} className="capitalize">
                      {order.status}
                    </Badge>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PreviewLayout>;
};
export default Preview;