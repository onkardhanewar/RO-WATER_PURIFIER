import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  badge?: string;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onBuyNow?: (id: string) => void;
}

export default function ProductCard({ product, onBuyNow }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [, setLocation] = useLocation();
  
  // Calculate save percentage if original price exists
  const savePercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Card
      data-testid={`product-card-${product.id}`}
      className="group overflow-hidden border border-white/10 bg-[#0a0f1a] backdrop-blur transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      onClick={() => {
        window.scrollTo(0, 0);
        setLocation(`/products/${product.id}`);
      }}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden m-4">
          {/* Save Badge */}
          {savePercentage && (
            <Badge
              className="absolute top-3 left-3 z-10 bg-orange-500 hover:bg-orange-600 text-white border-0"
              data-testid={`product-save-badge-${product.id}`}
            >
              Save {savePercentage}%
            </Badge>
          )}
          
          {/* NEW Badge */}
          {product.badge && (
            <Badge
              className="absolute top-3 right-3 z-10 bg-green-500 hover:bg-green-600 text-white border-0"
              data-testid={`product-badge-${product.id}`}
            >
              {product.badge}
            </Badge>
          )}
          
          {/* Favorite Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute bottom-3 left-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors hover-icon-bounce"
          >
            <Heart 
              className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500 animate-icon-pulse' : 'text-gray-600'}`}
            />
          </button>
          
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            data-testid={`product-image-${product.id}`}
          />
        </div>
        
        <div className="px-5 pb-5">
          <h3
            className="text-base font-medium text-white mb-2 line-clamp-2 min-h-[3rem]"
            data-testid={`product-name-${product.id}`}
          >
            {product.name}
          </h3>
          
          {/* Add to Compare */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCompared(!isCompared);
            }}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary mb-2 transition-colors"
          >
            <input 
              type="checkbox" 
              checked={isCompared}
              onChange={() => setIsCompared(!isCompared)}
              className="w-3 h-3"
              onClick={(e) => e.stopPropagation()}
            />
            <span>Add To Compare</span>
          </button>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-3 h-3 fill-orange-400 text-orange-400" />
            ))}
            <span className="text-xs text-gray-400 ml-1">1 review</span>
          </div>
          
          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3">
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span
              className="text-xl font-bold text-primary"
              data-testid={`product-price-${product.id}`}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          
          {/* EMI Option */}
          <div className="text-xs text-gray-400 mb-4">
            or ₹{Math.round(product.price / 12)}/Month <span className="text-primary cursor-pointer">Buy now</span>
          </div>
          
          {/* Add to Cart Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white border-0"
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow?.(product.id);
            }}
            data-testid={`product-buy-${product.id}`}
          >
            Add to Cart
          </Button>
          
          {/* Tax Notice */}
          <p className="text-xs text-gray-500 text-center mt-2">Inclusive of all taxes</p>
        </div>
      </CardContent>
    </Card>
  );
}
