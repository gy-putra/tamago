"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import StarRating from "@/components/StarRating";

interface ProductCardProps {
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

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/shoes/${product.id}`}>
      <div className="w-full h-auto bg-white dark:bg-neutral-900 rounded-xl shadow hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer flex flex-col justify-between">
        {/* Product Image */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="w-full object-cover"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2 flex-grow">
          <h4 className="font-medium text-base line-clamp-2 text-foreground min-h-[3rem]">
            {product.name}
          </h4>
          
          {/* Price */}
          <div className="flex flex-col space-y-1">
            {hasDiscount ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice!)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-foreground">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating 
              rating={product.averageRating || 0} 
              readonly={true} 
              size="sm"
            />
            {product.totalReviews > 0 && (
              <span className="text-sm text-muted-foreground">
                ({product.totalReviews})
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;