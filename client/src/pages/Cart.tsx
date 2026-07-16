import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  };
}

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        loadCart();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast({
          title: "Removed",
          description: "Item removed from cart",
        });
        loadCart();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast({
          title: "Cart cleared",
          description: "All items removed from cart",
        });
        loadCart();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Shopping Cart
            </h1>
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-white/10"
              >
                Clear Cart
              </Button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-400 mb-6">
                  Add some products to get started
                </p>
                <Button
                  onClick={() => setLocation("/products")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-white/10 bg-[#0a0f1a]">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0">
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {item.product?.name}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 border-white/10 hover-icon-scale"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center text-white">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 border-white/10 hover-icon-scale"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="text-xl font-bold text-orange-500">
                                ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-400 hover-icon-shake"
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-white/10 bg-[#0a0f1a] sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Order Summary
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Tax (GST 18%)</span>
                        <span className="text-white">₹{tax.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Shipping</span>
                        <span className="text-green-500">FREE</span>
                      </div>
                      <div className="pt-4 border-t border-white/10 flex justify-between">
                        <span className="text-lg font-semibold text-white">Total</span>
                        <span className="text-2xl font-bold text-orange-500">
                          ₹{total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      onClick={() => setLocation("/checkout")}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white mb-3"
                    >
                      Proceed to Checkout
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-white/10"
                      onClick={() => setLocation("/products")}
                    >
                      Continue Shopping
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Inclusive of all taxes
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
