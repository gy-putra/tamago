"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import StarRating from "@/components/StarRating";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import DiscountBadge from "@/components/DiscountBadge";
import BestsellerBadge from "@/components/BestsellerBadge";
import { Heart, ShoppingBag } from "lucide-react";

interface WishlistItem {
  id: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    stock?: number;
    averageRating: number;
    totalReviews: number;
    isBestseller?: boolean;
  };
}

const WishlistContent = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      fetchWishlist();
    }
  }, [isSignedIn]);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.wishlist);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistUpdate = () => {
    // Refresh wishlist after item removal
    fetchWishlist();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Start adding products to your wishlist by clicking the heart icon on any product card.
        </p>
        <Button asChild size="lg">
          <Link href="/all-shoes">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Browse Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
      {wishlistItems.map((item) => {
        const product = item.product;
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercentage = hasDiscount && product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0;

        return (
          <Card key={item.id} className="relative group hover:shadow-lg transition-shadow duration-300">
            {/* Discount Badge */}
            {hasDiscount && (
              <DiscountBadge discountPercentage={discountPercentage} />
            )}
            
            {/* Bestseller Badge */}
            {product.isBestseller && (
              <BestsellerBadge className={hasDiscount ? "top-12" : ""} />
            )}
            
            {/* Wishlist Button */}
            <WishlistButton 
              productId={product.id} 
              className="opacity-100 group-hover:opacity-100"
            />

            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <Link href={`/shoes/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-md w-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              {/* Price Display */}
              <div className="w-full">
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatCurrency(product.originalPrice!)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
                )}
              </div>

              {/* Star Rating */}
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <StarRating 
                    rating={product.averageRating || 0} 
                    readonly={true} 
                    size="sm"
                  />
                  {product.totalReviews > 0 && (
                    <span className="text-sm text-muted-foreground">
                      ({product.totalReviews} review{product.totalReviews !== 1 ? 's' : ''})
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/shoes/${product.id}`}>
                    View Details
                  </Link>
                </Button>
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    stock: product.stock || 0,
                  }}
                  variant="default"
                  size="sm"
                  className="flex-1"
                />
              </div>

              {/* Added to wishlist date */}
              <div className="w-full text-xs text-muted-foreground text-center">
                Added {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default WishlistContent;