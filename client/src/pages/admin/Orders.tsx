import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Package, MapPin, Calendar, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: string;
  subtotal: number;
  tax: number;
  total: number;
  installationDate?: string;
  installationTimeSlot?: string;
  status: string;
  createdAt: string;
}

export default function AdminOrders() {
  const [, setLocation] = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadOrders();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/me", { credentials: "include" });
      if (!response.ok) {
        setLocation("/admin/login");
      }
    } catch (error) {
      setLocation("/admin/login");
    }
  };

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({
          title: "Status Updated",
          description: "Order status has been updated successfully",
        });
        loadOrders();
        if (selectedOrder?.id === orderId) {
          const updated = await response.json();
          setSelectedOrder(updated);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const parseItems = (itemsJson: string) => {
    try {
      return JSON.parse(itemsJson);
    } catch {
      return [];
    }
  };

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
    return null;
  };

  const viewOrderDetails = async (order: Order) => {
    // Fetch product details for each item
    const items = parseItems(order.items);
    const itemsWithDetails = await Promise.all(
      items.map(async (item: any) => {
        const product = await fetchProductDetails(item.productId);
        return {
          ...item,
          productImage: product?.image || '',
          productDescription: product?.description || '',
        };
      })
    );
    
    setSelectedOrder({
      ...order,
      items: JSON.stringify(itemsWithDetails),
    });
    setDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-600",
      confirmed: "bg-blue-600",
      processing: "bg-purple-600",
      shipped: "bg-indigo-600",
      delivered: "bg-green-600",
      cancelled: "bg-red-600",
    };
    return colors[status] || "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen p-6">
          <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-800"
              onClick={() => setLocation("/admin/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-800"
              onClick={() => setLocation("/admin/products")}
            >
              Products
            </Button>
            <Button
              variant="default"
              className="w-full justify-start bg-primary"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Orders
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-800"
              onClick={() => setLocation("/admin/queries")}
            >
              Queries
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-800"
              onClick={() => setLocation("/admin/services")}
            >
              Services
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-800"
              onClick={() => setLocation("/admin/complaints")}
            >
              Complaints
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Card className="border-white/10 bg-[#0a0f1a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Customer Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-400 text-center py-8">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No orders yet</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-gray-400">Order #</TableHead>
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400">Phone</TableHead>
                      <TableHead className="text-gray-400">Total</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="border-white/10">
                        <TableCell className="text-white font-mono text-sm">
                          {order.orderNumber}
                        </TableCell>
                        <TableCell className="text-white">{order.customerName}</TableCell>
                        <TableCell className="text-white">{order.phone}</TableCell>
                        <TableCell className="text-orange-500 font-bold">
                          ₹{order.total.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} hover:${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 hover:bg-white/5"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0a0f1a] border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Order Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete information about this order
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-orange-600/20 to-purple-600/20 p-4 rounded-lg border border-orange-500/30">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Order Number</p>
                    <p className="text-white font-mono text-xl font-bold">{selectedOrder.orderNumber}</p>
                  </div>
                  <Badge className={`${getStatusColor(selectedOrder.status)} hover:${getStatusColor(selectedOrder.status)} text-sm px-3 py-1`}>
                    {selectedOrder.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}</span>
                </div>
              </div>
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Name</p>
                    <p className="text-white">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-white">{selectedOrder.phone}</p>
                  </div>
                  {selectedOrder.email && (
                    <div className="col-span-2">
                      <p className="text-gray-400">Email</p>
                      <p className="text-white">{selectedOrder.email}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Delivery Address
                </h3>
                <p className="text-white text-sm">{selectedOrder.address}</p>
                <p className="text-white text-sm">{selectedOrder.city}, {selectedOrder.pincode}</p>
              </div>

              {/* Installation */}
              {(selectedOrder.installationDate || selectedOrder.installationTimeSlot) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    Installation Preferences
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedOrder.installationDate && (
                      <div>
                        <p className="text-gray-400">Date</p>
                        <p className="text-white">
                          {new Date(selectedOrder.installationDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {selectedOrder.installationTimeSlot && (
                      <div>
                        <p className="text-gray-400">Time Slot</p>
                        <p className="text-white capitalize">{selectedOrder.installationTimeSlot}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Order Items
                </h3>
                <div className="space-y-3">
                  {parseItems(selectedOrder.items).map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 p-4 bg-black/50 rounded-lg border border-white/10">
                      {/* Product Image */}
                      {item.productImage && (
                        <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      )}
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base">{item.productName}</h4>
                        {item.productDescription && (
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.productDescription}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-400">Quantity: <span className="text-white font-medium">{item.quantity}</span></span>
                          <span className="text-gray-400">Price: <span className="text-white font-medium">₹{item.price.toLocaleString('en-IN')}</span></span>
                        </div>
                      </div>
                      
                      {/* Item Total */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-gray-400 text-xs mb-1">Item Total</p>
                        <p className="text-orange-500 font-bold text-lg">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Summary */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-medium">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax (18% GST)</span>
                    <span className="text-white font-medium">₹{selectedOrder.tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/10">
                    <span className="text-white font-bold text-lg">Total Amount</span>
                    <span className="text-orange-500 font-bold text-2xl">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Update Order Status</h3>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => updateStatus(selectedOrder.id, value)}
                >
                  <SelectTrigger className="bg-black border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
