import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onBuyNow?: (id: number) => void;
}

export default function ProductCard({ product, onBuyNow }: ProductCardProps) {
  return (
    <Card
      data-testid={`product-card-${product.id}`}
      className="group overflow-visible border-0 bg-card/50 backdrop-blur transition-all duration-500 hover:bg-card"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-muted/20 rounded-t-lg overflow-hidden">
          {product.badge && (
            <Badge
              className="absolute top-4 left-4 z-10"
              variant="secondary"
              data-testid={`product-badge-${product.id}`}
            >
              {product.badge}
            </Badge>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-testid={`product-image-${product.id}`}
          />
        </div>
        <div className="p-6">
          <h3
            className="text-lg font-semibold text-foreground mb-2"
            data-testid={`product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-baseline gap-2 mb-5">
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
          <div className="flex gap-3">
            <Link href="/contact" className="flex-1">
              <Button
                className="w-full"
                onClick={() => onBuyNow?.(product.id)}
                data-testid={`product-buy-${product.id}`}
              >
                Enquire
              </Button>
            </Link>
            <Link href={`/products/${product.id}`}>
              <Button variant="outline" size="icon" data-testid={`product-details-${product.id}`}>
                <i className="fa-solid fa-arrow-right" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
