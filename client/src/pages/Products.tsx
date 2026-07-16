import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCardMobile from "@/components/ProductCardMobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

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

export default function Products() {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.filter((p: Product) => p.inStock));
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async (productId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const product = products.find((p) => p.id === productId);
        toast({
          title: "Added to cart",
          description: `${product?.name} has been added to your cart.`,
        });
        // Navigate to cart page to show the added product
        setTimeout(() => setLocation("/cart"), 500);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header - Desktop */}
      <section className="hidden md:block pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Our Premium Products
          </h1>
          <p className="text-gray-400 text-sm">
            {loading ? "Loading..." : `${products.length} products available`}
          </p>
        </div>
      </section>

      {/* Mobile Header - Flipkart Style */}
      <section className="md:hidden pt-16 mt-7 bg-background sticky top-7 z-40 border-b border-border/50">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-base font-semibold text-white">
                Water Purifiers
              </h1>
              <p className="text-xs text-muted-foreground">
                {loading ? "Loading..." : `${products.length} products`}
              </p>
            </div>
            
            {/* Filter & Sort Buttons */}
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-border/50">
                    <i className="fa-solid fa-filter mr-1.5 text-xs" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-background border-border/50">
                  <SheetHeader>
                    <SheetTitle className="text-foreground">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-foreground">Price Range</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          Under ₹10,000
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          ₹10,000 - ₹20,000
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          Above ₹20,000
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-foreground">Capacity</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          5-7 Liters
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          8-10 Liters
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          10+ Liters
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-foreground">Features</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          RO + UV
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          RO + UV + UF
                        </label>
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          Copper Infused
                        </label>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-8 w-[100px] text-xs border-border/50">
                  <i className="fa-solid fa-arrow-down-short-wide mr-1.5 text-xs" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border/50">
                  <SelectItem value="featured" className="text-xs">Featured</SelectItem>
                  <SelectItem value="price-low" className="text-xs">Price: Low</SelectItem>
                  <SelectItem value="price-high" className="text-xs">Price: High</SelectItem>
                  <SelectItem value="name" className="text-xs">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid with Sort */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto md:px-6">
          {/* Desktop Sort By */}
          <div className="hidden md:flex justify-end mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-[#0a0f1a] border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0f1a] border-white/10">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Mobile Product List - Flipkart Style */}
              <div className="md:hidden flex flex-col gap-3 px-3 pt-3">
                {sortedProducts.map((product) => (
                  <ProductCardMobile key={product.id} product={product} onBuyNow={handleBuyNow} />
                ))}
              </div>

              {/* Desktop Product Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-shield-halved text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quality Assured</h3>
              <p className="text-muted-foreground text-sm">
                All products are certified and tested for optimal performance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-truck-fast text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Free Installation</h3>
              <p className="text-muted-foreground text-sm">
                Professional installation included with every purchase.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-headset text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Round-the-clock customer support for all your queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
