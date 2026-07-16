import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string;
  capacity: string;
  warranty: string;
  inStock: boolean;
}

export default function Compare() {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const addToCompare = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && !compareProducts.find((p) => p.id === productId)) {
      setCompareProducts([...compareProducts, product]);
      setSelectedProductId("");
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareProducts(compareProducts.filter((p) => p.id !== productId));
  };

  const parseFeatures = (featuresStr: string): string[] => {
    try {
      const parsed = JSON.parse(featuresStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Compare Products
          </h1>

          {/* Add Product Selector */}
          <Card className="border-white/10 bg-[#0a0f1a] mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger className="flex-1 border-white/10 bg-background">
                    <SelectValue placeholder="Select a product to compare" />
                  </SelectTrigger>
                  <SelectContent>
                    {products
                      .filter((p) => !compareProducts.find((cp) => cp.id === p.id))
                      .map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => selectedProductId && addToCompare(selectedProductId)}
                  disabled={!selectedProductId || compareProducts.length >= 4}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Add to Compare
                </Button>
              </div>
              {compareProducts.length >= 4 && (
                <p className="text-sm text-yellow-500 mt-2">
                  Maximum 4 products can be compared at once
                </p>
              )}
            </CardContent>
          </Card>

          {/* Comparison Table */}
          {compareProducts.length === 0 ? (
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  No products to compare
                </h3>
                <p className="text-gray-400 mb-6">
                  Add products from the dropdown above to start comparing
                </p>
                <Button
                  onClick={() => setLocation("/products")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-[#0a0f1a] border border-white/10 text-gray-400 w-48">
                      Property
                    </th>
                    {compareProducts.map((product) => (
                      <th
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10 relative"
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                          onClick={() => removeFromCompare(product.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Product Images */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Product
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 bg-white rounded-lg mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <h3 className="text-white font-semibold text-center mb-2">
                            {product.name}
                          </h3>
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => setLocation(`/products/${product.id}`)}
                            className="text-orange-500"
                          >
                            View Details
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Price
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10 text-center"
                      >
                        <span className="text-2xl font-bold text-orange-500">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Availability */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Availability
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10 text-center"
                      >
                        <Badge
                          className={
                            product.inStock
                              ? "bg-green-600 hover:bg-green-600"
                              : "bg-red-600 hover:bg-red-600"
                          }
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Capacity */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Capacity
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10 text-center text-gray-300"
                      >
                        {product.capacity}
                      </td>
                    ))}
                  </tr>

                  {/* Warranty */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Warranty
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10 text-center text-gray-300"
                      >
                        {product.warranty}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Rating
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10 text-center"
                      >
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-500 text-yellow-500"
                            />
                          ))}
                          <span className="text-sm text-gray-400 ml-1">(4.5)</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Features */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Key Features
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10"
                      >
                        <ul className="space-y-2 text-sm text-gray-300">
                          {parseFeatures(product.features).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Description
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10 text-sm text-gray-300"
                      >
                        {product.description}
                      </td>
                    ))}
                  </tr>

                  {/* Action Buttons */}
                  <tr>
                    <td className="p-4 bg-[#0a0f1a] border border-white/10 font-semibold text-white">
                      Actions
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 bg-[#0a0f1a] border border-white/10"
                      >
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => setLocation(`/products/${product.id}`)}
                            className="w-full bg-orange-600 hover:bg-orange-700"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-white/10"
                            onClick={() => removeFromCompare(product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
