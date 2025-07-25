import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  current_stock: number;
  unit_type: string | null;
}

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function StockAdjustmentModal({ isOpen, onClose, onSuccess }: StockAdjustmentModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [newStockLevel, setNewStockLevel] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, current_stock, unit_type')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !newStockLevel || !user) return;

    setLoading(true);
    
    try {
      const newStock = parseInt(newStockLevel);
      const currentStock = selectedProduct?.current_stock || 0;
      const adjustment = newStock - currentStock;

      if (adjustment === 0) {
        toast({
          title: "No Adjustment Needed",
          description: "The new stock level is the same as current stock.",
          variant: "default",
        });
        setLoading(false);
        return;
      }

      // Create stock movement record
      const { error: movementError } = await supabase
        .from('stock_movements')
        .insert({
          product_id: selectedProductId,
          quantity: adjustment,
          movement_type: 'adjustment',
          notes: notes || `Stock adjustment: ${currentStock} → ${newStock}`,
          user_id: user.id
        });

      if (movementError) throw movementError;

      // Update product stock level
      const { error: updateError } = await supabase
        .from('products')
        .update({ current_stock: newStock })
        .eq('id', selectedProductId);

      if (updateError) throw updateError;

      toast({
        title: "Stock Adjusted",
        description: `${selectedProduct?.name} stock updated from ${currentStock} to ${newStock}`,
        variant: "default",
      });

      // Reset form
      setSelectedProductId('');
      setNewStockLevel('');
      setNotes('');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error adjusting stock:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to adjust stock level",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Stock Level</DialogTitle>
          <DialogDescription>
            Update the actual stock level for a product during stock checks.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} (Current: {product.current_stock} {product.unit_type || 'units'})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProduct && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Current Stock: <span className="font-medium">{selectedProduct.current_stock} {selectedProduct.unit_type || 'units'}</span>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="newStock">New Stock Level</Label>
            <Input
              id="newStock"
              type="number"
              min="0"
              value={newStockLevel}
              onChange={(e) => setNewStockLevel(e.target.value)}
              placeholder="Enter actual stock count"
              onFocus={(e) => e.target.select()}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reason for adjustment (e.g., stock check, found missing items)"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !selectedProductId || !newStockLevel}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Adjust Stock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}