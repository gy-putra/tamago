"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import StarRating from "@/components/StarRating";

interface MiniProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    averageRating: number;
    totalReviews: number;
  };
}

const MiniProductCard = ({ product }: MiniProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/shoes/${product.id}`}>
      <div className="bg-card border rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 p-3 cursor-pointer w-full">
        {/* Product Image */}
        <div className="relative mb-3">
          <Image
            src={product.image}
            alt={product.name}
            width={240}
            height={160}
            className="w-full h-40 object-cover rounded-md"
            priority={false}
            loading="lazy"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm line-clamp-2 text-foreground leading-tight">
            {product.name}
          </h4>
          
          {/* Price */}
          <div className="flex flex-col">
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice!)}
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1">
            <StarRating 
              rating={product.averageRating || 0} 
              readonly={true} 
              size="sm"
              className="scale-75"
            />
            {product.totalReviews > 0 && (
              <span className="text-xs text-muted-foreground">
                ({product.totalReviews})
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MiniProductCard;