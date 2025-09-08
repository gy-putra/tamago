"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock?: number;
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  className,
  variant = "default",
  size = "default"
}) => {
  const { addItem, items } = useCart();

  const handleAddToCart = () => {
    // Check if product is already in cart and stock limitations
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem && product.stock && existingItem.quantity >= product.stock) {
      toast.error(`Maximum stock (${product.stock}) reached for ${product.name}`);
      return;
    }

    if (product.stock && product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });

    toast.success(`${product.name} added to cart!`);
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const existingItem = items.find(item => item.id === product.id);
  const isMaxStock = !!(existingItem && product.stock && existingItem.quantity >= product.stock);

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isOutOfStock || isMaxStock}
      variant={variant}
      size={size}
      className={className}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isOutOfStock 
        ? "Out of Stock" 
        : isMaxStock 
        ? "Max Stock" 
        : "Add to Cart"
      }
    </Button>
  );
};

export default AddToCartButton;