import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

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

interface ProductCardMobileProps {
  product: Product;
  onBuyNow: (productId: string) => void;
}

export default function ProductCardMobile({ product, onBuyNow }: ProductCardMobileProps) {
  const [, setLocation] = useLocation();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    window.scrollTo(0, 0);
    setLocation(`/products/${product.id}`);
  };

  return (
    <div className="w-full  ">
      <Card 
        className="bg-card border border-border/50  hover:border-primary/50 transition-all cursor-pointer w-full"
        onClick={handleCardClick}
      >
        <div className="flex gap-3 p-3 min-h-[140px] w-full">
          {/* Product Image - Left Side */}
          <div className="flex-shrink-0 w-[100px]">
            <div className="w-[100px] h-[120px] relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {product.inStock && (
                <Badge className="absolute top-1 left-1 text-[10px] px-1.5 py-0 h-5 bg-green-600">
                  In Stock
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Product Name & Rating */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 leading-tight">
                {product.name}
              </h3>
              
              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-1 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded">
                  <span>4.3</span>
                  <i className="fa-solid fa-star text-[8px]" />
                </div>
                <span className="text-[11px] text-muted-foreground">
                  (1,234)
                </span>
              </div>

              {/* Key Features - Bullet Points */}
              <div className="space-y-0.5">
                {product.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <i className="fa-solid fa-circle text-[4px] text-muted-foreground mt-1.5" />
                    <span className="text-[11px] text-muted-foreground line-clamp-1 leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between gap-2 mt-2">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-primary leading-none">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-muted-foreground line-through leading-none">
                    ₹{(product.price * 1.3).toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-primary font-medium leading-none mt-0.5">
                  23% off
                </span>
              </div>

              {/* Quick Action Button */}
              <Button
                size="sm"
                className="h-7 px-3 text-xs bg-primary hover:bg-primary/90 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyNow(product.id);
                }}
              >
                <i className="fa-solid fa-cart-plus mr-1 text-xs" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
