"use server";

import { auth } from "@/auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const createShoes = async (data: any) => {
  try {
    const session = await auth();

    if (!session) throw new Error("Unauthenticated");

    const {
      values: { name, price, description, stock },
      image,
    } = data;

    const shoes = await prisma.product.create({
      data: {
        image,
        name,
        price: Number(price),
        stock: Number(stock),
        description: description || "",
      },
    });

    revalidatePath("/admin");

    return { success: true, shoes };
  } catch (error) {
    return { success: false, error };
  }
};

export const getShoe = async (id: string) => {
  try {
    const shoes = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return shoes;
  } catch (error) {
    console.error("Error in shoes action:", error);
  }
};

export const getAllShoes = async (sortBy?: "newest" | "price_asc" | "rating_desc") => {
  try {
    const shoes = await prisma.product.findMany({
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Default sort, will be overridden for price_asc
      },
    });

    // Calculate average rating and bestseller status for each product
    const shoesWithRatings = shoes.map((shoe) => {
      const reviews = shoe.reviews;
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      // Determine if product is a bestseller
      // Criteria: Rating ≥ 4.5 OR soldCount ≥ 50
      const isBestseller = averageRating >= 4.5 || (shoe.soldCount || 0) >= 50;

      return {
        ...shoe,
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews,
        isBestseller,
      };
    });

    // Apply sorting based on sortBy parameter
    let sortedShoes = [...shoesWithRatings];
    
    switch (sortBy) {
      case "price_asc":
        sortedShoes.sort((a, b) => a.price - b.price);
        break;
      case "rating_desc":
        sortedShoes.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "newest":
      default:
        // Already sorted by createdAt desc from the query
        break;
    }

    return sortedShoes;
  } catch (error) {
    console.error("Error in shoes action:", error);
  }
};

export const updateShoes = async (id: string, data: any) => {
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthenticated");

    const shoes = await prisma.product.update({
      where: {
        id,
      },
      data: {
        image: data.image,
        name: data.name,
        price: Number(data.price),
        stock: Number(data.stock),
        description: data.description,
      },
    });

    return { success: true, shoes };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteShoes = async (id: string) => {
  try {
    const session = await auth();

    if (!session) throw new Error("Unauthenticated");

    const shoes = await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const getNewShoes = async () => {
  try {
    const shoes = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    return shoes;
  } catch (error) {
    console.error("Error in shoes action:", error);
  }
};

export const getPricyShoes = async () => {
  try {
    const shoes = await prisma.product.findMany({
      orderBy: {
        price: "desc",
      },
      take: 1,
    });
    return shoes;
  } catch (error) {
    console.error("Error in shoes action:", error);
  }
};

export const takeFourShoes = async () => {
  try {
    const shoes = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });
    return shoes;
  } catch (error) {
    console.error("Error in shoes action:", error);
  }
};
