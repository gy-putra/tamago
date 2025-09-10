import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find or create the user in the database using Clerk's userId
    let user = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUserId,
      },
    });

    // If user doesn't exist in database, create them
    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            clerkUserId: clerkUserId,
            email: `user_${clerkUserId}@temp.com`, // Temporary email, should be updated with real data
          },
        });
      } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json(
          { error: "Failed to create user record" },
          { status: 500 }
        );
      }
    }

    const body = await request.json();
    const { items, shippingAddress, totalPrice } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items are required" },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.trim()) {
      return NextResponse.json(
        { error: "Shipping address is required" },
        { status: 400 }
      );
    }

    if (!totalPrice || totalPrice <= 0) {
      return NextResponse.json(
        { error: "Total price is required and must be greater than 0" },
        { status: 400 }
      );
    }

    // Validate items and check stock availability
    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // Check if all products exist
    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "One or more products not found" },
        { status: 400 }
      );
    }

    // Validate stock and prices
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      if (product.stock && item.quantity > product.stock) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}` },
          { status: 400 }
        );
      }

      // Validate price (to prevent price manipulation)
      if (Math.abs(item.price - product.price) > 0.01) {
        return NextResponse.json(
          { error: `Price mismatch for ${product.name}` },
          { status: 400 }
        );
      }
    }

    // Create order with order items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          totalPrice,
          shippingAddress,
          status: "pending",
        },
      });

      // Create order items
      const orderItems = await Promise.all(
        items.map((item: any) =>
          tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          })
        )
      );

      // Update product stock
      await Promise.all(
        items.map((item: any) => {
          const product = products.find((p) => p.id === item.productId);
          if (product && product.stock !== null) {
            return tx.product.update({
              where: { id: item.productId },
              data: {
                stock: product.stock - item.quantity,
              },
            });
          }
          return Promise.resolve();
        })
      );

      return {
        ...newOrder,
        orderItems,
      };
    });

    return NextResponse.json(
      {
        success: true,
        order: {
          id: order.id,
          totalPrice: order.totalPrice,
          status: order.status,
          createdAt: order.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    
    // Handle Prisma errors
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "User or product not found." },
        { status: 400 }
      );
    }
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Duplicate order detected." },
        { status: 400 }
      );
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Record not found." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find or create the user in the database using Clerk's userId
    let user = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUserId,
      },
    });

    // If user doesn't exist in database, create them
    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            clerkUserId: clerkUserId,
            email: `user_${clerkUserId}@temp.com`, // Temporary email, should be updated with real data
          },
        });
      } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json(
          { error: "Failed to create user record" },
          { status: 500 }
        );
      }
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    
    // Handle Prisma errors
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "User or product not found." },
        { status: 400 }
      );
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Record not found." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}