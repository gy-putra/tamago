"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { formatCurrency } from "@/lib/formatCurrency";
import StarRating from "@/components/StarRating";
import DiscountBadge from "@/components/DiscountBadge";
import BestsellerBadge from "@/components/BestsellerBadge";
import WishlistButton from "@/components/WishlistButton";

const ListAllShoes = ({ shoes }: { shoes: any }) => {
  // Helper function to calculate discount percentage
  const calculateDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
      {shoes.map((shoe: any) => {
        const hasDiscount = shoe.originalPrice && shoe.originalPrice > shoe.price;
        const discountPercentage = hasDiscount 
          ? calculateDiscountPercentage(shoe.originalPrice, shoe.price)
          : 0;
          
        return (
        <Card key={shoe.id} className="relative">
          {/* Discount Badge */}
          {hasDiscount && (
            <DiscountBadge discountPercentage={discountPercentage} />
          )}
          
          {/* Bestseller Badge */}
          {shoe.isBestseller && (
            <BestsellerBadge className={hasDiscount ? "top-12" : ""} />
          )}
          
          {/* Wishlist Button */}
          <WishlistButton productId={shoe.id} />
          
          <CardHeader>
            <div className="flex justify-between items-center">
              {/* <CardTitle>{shoe.name}</CardTitle> */}
              {/* <CardAction>
                <Link
                  href={`/shoes/${shoe.id}`}
                  className="border text-sm px-3 py-1 rounded-full bg-indigo-500 text-white"
                >
                  Lihat
                </Link>
              </CardAction> */}
            </div>
          </CardHeader>
          <CardContent>
            <Image
              src={shoe.image}
              alt={shoe.name}
              width={300}
              height={300}
              className="rounded-md w-full"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <CardTitle>{shoe.name}</CardTitle>
            {/* Price Display with Discount Support */}
            <div className="text-muted-foreground w-full">
              {hasDiscount ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      {formatCurrency(shoe.price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatCurrency(shoe.originalPrice)}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-lg font-bold">{formatCurrency(shoe.price)}</span>
              )}
            </div>
            
            {/* Star Rating Display */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <StarRating 
                  rating={shoe.averageRating || 0} 
                  readonly={true} 
                  size="sm"
                />
                {shoe.totalReviews > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({shoe.totalReviews} review{shoe.totalReviews !== 1 ? 's' : ''})
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 w-full">
              <Link
                href={`/shoes/${shoe.id}`}
                className="border text-sm px-3 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black flex-1 text-center"
              >
                View Details
              </Link>
              <AddToCartButton
                product={{
                  id: shoe.id,
                  name: shoe.name,
                  price: shoe.price,
                  image: shoe.image,
                  stock: shoe.stock,
                }}
                variant="outline"
                size="sm"
                className="flex-1"
              />
            </div>
          </CardFooter>
        </Card>
        );
      })}
    </div>
  );
};

export default ListAllShoes;
