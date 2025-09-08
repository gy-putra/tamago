import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all products
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error("Error fetching products:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}