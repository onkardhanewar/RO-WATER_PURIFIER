import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Truck, Shield, Headset, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  capacity: string;
  warranty: string;
  inStock: boolean;
}

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (params?.id) {
      loadProduct(params.id);
    }
  }, [params?.id]);

  const loadProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        setLocation("/products");
      }
    } catch (error) {
      console.error("Failed to load product:", error);
      setLocation("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (response.ok) {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    setLocation("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-primary">Products</a>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <ScrollReveal animation="scale-in">
              <div className="space-y-4">
                <Card className="overflow-hidden border-white/10 bg-white">
                  <CardContent className="p-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto object-contain"
                    />
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>

            {/* Product Info */}
            <div className="space-y-6">
              <ScrollReveal animation="motion-blur">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {product.name}
                  </h1>
                  <p className="text-gray-400 text-lg">
                    {product.description}
                  </p>
                </div>
              </ScrollReveal>

              {/* Price */}
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-orange-500">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <Badge className="bg-green-500 text-white">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </ScrollReveal>

              {/* EMI */}
              <div className="text-gray-400">
                or ₹{Math.round(product.price / 12)}/Month. <span className="text-primary cursor-pointer">EMI options available</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-white">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-white/10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center text-white">{quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-white/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <ScrollReveal animation="fade-up" delay={200}>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              </ScrollReveal>

              {/* Trust Badges */}
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Free Delivery</div>
                    <div className="text-xs text-gray-400">On all orders</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{product.warranty}</div>
                    <div className="text-xs text-gray-400">Warranty</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Headset className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white font-medium">24/7 Support</div>
                    <div className="text-xs text-gray-400">Dedicated help</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Certified</div>
                    <div className="text-xs text-gray-400">Quality assured</div>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Product Details Tabs */}
          <ScrollReveal animation="fade-up">
            <Tabs defaultValue="features" className="w-full">
            <TabsList className="bg-[#0a0f1a] border-white/10">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <Card className="border-white/10 bg-[#0a0f1a]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card className="border-white/10 bg-[#0a0f1a]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Technical Specifications</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-gray-400">Capacity</span>
                      <span className="text-white font-medium">{product.capacity}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-gray-400">Warranty</span>
                      <span className="text-white font-medium">{product.warranty}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-gray-400">Availability</span>
                      <span className="text-white font-medium">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="description" className="mt-6">
              <Card className="border-white/10 bg-[#0a0f1a]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Product Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </div>
      </div>      <Footer />
    </div>
  );
}
