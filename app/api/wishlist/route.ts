import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch user's wishlist
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkUserId: userId,
          email: "user@example.com", // Default email
          name: "User", // Default name
        },
      });
    }

    const wishlistItems = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate average ratings and bestseller status for products
    const wishlistWithRatings = wishlistItems.map((item) => {
      const reviews = item.product.reviews;
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      // Determine if product is a bestseller
      // Criteria: Rating ≥ 4.5 OR soldCount ≥ 50
      const isBestseller = averageRating >= 4.5 || (item.product.soldCount || 0) >= 50;

      return {
        id: item.id,
        createdAt: item.createdAt,
        product: {
          ...item.product,
          averageRating: Number(averageRating.toFixed(1)),
          totalReviews,
          isBestseller,
        },
      };
    });

    return NextResponse.json({ wishlist: wishlistWithRatings });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Add product to wishlist
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkUserId: userId,
          email: "user@example.com", // Default email
          name: "User", // Default name
        },
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if already in wishlist
    const existingItem = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId,
        },
      },
    });

    if (existingItem) {
      return NextResponse.json({ error: "Product already in wishlist" }, { status: 400 });
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: user.id,
        productId: productId,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({ 
      message: "Product added to wishlist", 
      wishlistItem 
    }, { status: 201 });

  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Remove product from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove from wishlist
    const deletedItem = await prisma.wishlist.deleteMany({
      where: {
        userId: user.id,
        productId: productId,
      },
    });

    if (deletedItem.count === 0) {
      return NextResponse.json({ error: "Product not found in wishlist" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product removed from wishlist" });

  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}