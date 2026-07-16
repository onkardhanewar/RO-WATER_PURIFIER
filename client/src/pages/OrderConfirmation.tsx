import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Package, Truck, MapPin, Calendar, Clock } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
  items: string;
  subtotal: number;
  tax: number;
  total: number;
  installationDate?: string;
  installationTimeSlot?: string;
  additionalNotes?: string;
  status: string;
  createdAt: string;
}

export default function OrderConfirmation() {
  const [, params] = useRoute("/order-confirmation/:orderNumber");
  const [, setLocation] = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.orderNumber) {
      loadOrder(params.orderNumber);
    }
  }, [params?.orderNumber]);

  const loadOrder = async (orderNumber: string) => {
    try {
      const response = await fetch(`/api/orders/${orderNumber}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        setLocation("/");
      }
    } catch (error) {
      console.error("Failed to load order:", error);
      setLocation("/");
    } finally {
      setLoading(false);
    }
  };

  const parseItems = (itemsJson: string) => {
    try {
      return JSON.parse(itemsJson);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const items = parseItems(order.items);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-400">
              Thank you for your order. We'll contact you shortly.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#0a0f1a] border border-white/10 rounded-lg">
              <span className="text-gray-400">Order Number:</span>
              <span className="text-xl font-bold text-orange-500">{order.orderNumber}</span>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Customer Info */}
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Customer Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400">Name</p>
                    <p className="text-white font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-white font-medium">{order.phone}</p>
                  </div>
                  {order.email && (
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white font-medium">{order.email}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Delivery Address
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-white">{order.address}</p>
                  {order.landmark && (
                    <p className="text-gray-400">Near: {order.landmark}</p>
                  )}
                  <p className="text-white">{order.city}, {order.pincode}</p>
                </div>
              </CardContent>
            </Card>

            {/* Installation Info */}
            {(order.installationDate || order.installationTimeSlot) && (
              <Card className="border-white/10 bg-[#0a0f1a]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    Installation Preferences
                  </h3>
                  <div className="space-y-3 text-sm">
                    {order.installationDate && (
                      <div>
                        <p className="text-gray-400">Preferred Date</p>
                        <p className="text-white font-medium">
                          {new Date(order.installationDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {order.installationTimeSlot && (
                      <div>
                        <p className="text-gray-400">Time Slot</p>
                        <p className="text-white font-medium capitalize">
                          {order.installationTimeSlot}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Status */}
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-orange-500" />
                  Order Status
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400">Current Status</p>
                    <p className="text-white font-medium capitalize">{order.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Order Date</p>
                    <p className="text-white font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <Card className="border-white/10 bg-[#0a0f1a] mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
              <div className="space-y-4">
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0">
                    <div>
                      <p className="text-white font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-orange-500 font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax (GST 18%)</span>
                  <span className="text-white">₹{order.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Installation</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="text-lg font-semibold text-white">Total Amount</span>
                  <span className="text-2xl font-bold text-orange-500">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          {order.additionalNotes && (
            <Card className="border-white/10 bg-[#0a0f1a] mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Additional Notes</h3>
                <p className="text-gray-400 text-sm">{order.additionalNotes}</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/")}
              className="bg-primary hover:bg-primary/90"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => setLocation("/products")}
              variant="outline"
              className="border-white/10"
            >
              View More Products
            </Button>
          </div>

          {/* Info Box */}
          <Card className="border-white/10 bg-[#0a0f1a] mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">What Happens Next?</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Our executive will contact you within 24 hours to confirm the order</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Free installation will be scheduled at your preferred time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Payment can be made after installation and satisfaction</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
