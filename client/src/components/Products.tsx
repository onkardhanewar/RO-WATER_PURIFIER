import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import product1 from "@assets/generated_images/modern_ro_water_purifier_product.png";
import product2 from "@assets/generated_images/premium_black_ro_purifier.png";
import product3 from "@assets/generated_images/under-sink_ro_system.png";
import product4 from "@assets/generated_images/commercial_ro_purifier.png";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  features: string[];
  badge?: string;
}

// todo: remove mock functionality
const products: Product[] = [
  {
    id: 1,
    name: "AquaPure Pro 7",
    image: product1,
    price: "12,999",
    originalPrice: "15,999",
    features: ["7-Stage Purification", "10L Storage Tank", "Smart LED Indicator", "1 Year Warranty"],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "AquaPure Elite X",
    image: product2,
    price: "18,499",
    originalPrice: "22,999",
    features: ["RO + UV + UF Technology", "Touch Display", "Mineral Enhancer", "2 Year Warranty"],
    badge: "Premium",
  },
  {
    id: 3,
    name: "AquaPure Slim",
    image: product3,
    price: "9,999",
    features: ["Under-sink Installation", "Space Saving Design", "5-Stage Filtration", "1 Year Warranty"],
  },
  {
    id: 4,
    name: "AquaPure Commercial",
    image: product4,
    price: "45,999",
    features: ["50 LPH Capacity", "Industrial Grade", "Stainless Steel Body", "3 Year Warranty"],
    badge: "Commercial",
  },
];

interface ProductsProps {
  onBuyNow?: (productId: number) => void;
}

export default function Products({ onBuyNow }: ProductsProps) {
  return (
    <section
      id="products"
      data-testid="products-section"
      className="py-16 md:py-24 lg:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="products-title">
            Our <span className="text-primary">Premium</span> Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our range of advanced RO water purifiers designed for every need and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              data-testid={`product-card-${product.id}`}
              className="group overflow-visible transition-transform duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted/30 rounded-t-lg overflow-hidden">
                  {product.badge && (
                    <Badge
                      className="absolute top-3 left-3 z-10"
                      data-testid={`product-badge-${product.id}`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`product-image-${product.id}`}
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="text-lg font-semibold text-foreground mb-2"
                    data-testid={`product-name-${product.id}`}
                  >
                    {product.name}
                  </h3>
                  <ul className="space-y-1 mb-4">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <i className="fa-solid fa-check text-primary text-xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-2xl font-bold text-foreground"
                      data-testid={`product-price-${product.id}`}
                    >
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => onBuyNow?.(product.id)}
                    data-testid={`product-buy-${product.id}`}
                  >
                    <i className="fa-solid fa-shopping-cart mr-2" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
