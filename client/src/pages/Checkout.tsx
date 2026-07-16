import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    installationDate: "",
    installationTimeSlot: "",
    additionalNotes: "",
  });

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
        if (data.length === 0) {
          setLocation("/cart");
        }
        setCartItems(data);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        ...formData,
        items: JSON.stringify(cartItems.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        }))),
        subtotal,
        tax,
        total,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        setLocation(`/order-confirmation/${order.orderNumber}`);
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Failed to place your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 mb-2">
              Fill in your details and we'll contact you for installation
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-white/10 bg-[#0a0f1a] sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-white">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-white/10">
                        <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0">
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium mb-1">
                            {item.product?.name}
                          </h4>
                          <p className="text-orange-500 font-bold">
                            ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Product Price</span>
                        <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Installation</span>
                        <span className="text-green-500">FREE</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Delivery</span>
                        <span className="text-green-500">FREE</span>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex justify-between font-bold">
                        <span className="text-white">Total Amount</span>
                        <span className="text-orange-500 text-lg">₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Free Installation</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>1 Year Warranty</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>7 Days Return Policy</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="border-white/10 bg-[#0a0f1a]">
                  <CardHeader>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customerName" className="text-white">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="customerName"
                          name="customerName"
                          placeholder="Enter your full name"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          required
                          className="bg-[#1a2332] border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="bg-[#1a2332] border-white/10 text-white mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-[#1a2332] border-white/10 text-white mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card className="border-white/10 bg-[#0a0f1a]">
                  <CardHeader>
                    <CardTitle className="text-white">Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-white">
                        Full Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="House no, Street, Area"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="bg-[#1a2332] border-white/10 text-white mt-1 min-h-24"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-white">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Amravati"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="bg-[#1a2332] border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode" className="text-white">
                          Pincode <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          placeholder="444601"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                          className="bg-[#1a2332] border-white/10 text-white mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="landmark" className="text-white">Landmark (Optional)</Label>
                      <Input
                        id="landmark"
                        name="landmark"
                        placeholder="Near famous landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="bg-[#1a2332] border-white/10 text-white mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Installation Preferences */}
                <Card className="border-white/10 bg-[#0a0f1a]">
                  <CardHeader>
                    <CardTitle className="text-white">Installation Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="installationDate" className="text-white">
                          Preferred Installation Date
                        </Label>
                        <Input
                          id="installationDate"
                          name="installationDate"
                          type="date"
                          value={formData.installationDate}
                          onChange={handleInputChange}
                          className="bg-[#1a2332] border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="installationTimeSlot" className="text-white">
                          Preferred Time Slot
                        </Label>
                        <Select
                          value={formData.installationTimeSlot}
                          onValueChange={(value) =>
                            setFormData({ ...formData, installationTimeSlot: value })
                          }
                        >
                          <SelectTrigger className="bg-[#1a2332] border-white/10 text-white mt-1">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12 PM - 3 PM)</SelectItem>
                            <SelectItem value="evening">Evening (3 PM - 6 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes" className="text-white">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        placeholder="Any special requirements or notes..."
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        className="bg-[#1a2332] border-white/10 text-white mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg"
                >
                  {loading ? "Placing Order..." : "Place Order →"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our terms and conditions. Our executive will contact
                  you within 24 hours.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
