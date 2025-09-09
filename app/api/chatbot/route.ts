import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { callGroqAI, ProductData } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    let requestBody;
    let requestText;
    try {
      requestText = await request.text();
      requestBody = JSON.parse(requestText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw request text was:', requestText);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    const { message } = requestBody;
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Query database for comprehensive product context
    const products = await prisma.product.findMany({
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Transform products data for Groq AI
    const productData: ProductData[] = products.map(product => {
      const reviews = product.reviews;
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      // Determine if product is a bestseller (same logic as in shoes.action.ts)
      const isBestseller = averageRating >= 4.5 || (product.soldCount || 0) >= 50;

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || undefined,
        image: product.image,
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews,
        soldCount: product.soldCount || 0,
        isBestseller,
        stock: product.stock || undefined,
        description: product.description || undefined,
        createdAt: product.createdAt,
      };
    });

    // Get AI response from Groq
    const aiResult = await callGroqAI({
      userMessage: message,
      productData: productData,
    });

    return NextResponse.json({
      response: aiResult.response,
      products: aiResult.products,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Chatbot API error:", error);
    
    // Enhanced fallback response
    return NextResponse.json({
      response: "I'm having some technical difficulties, but I'm here to help! 😊",
      products: [], // Add empty products array
      timestamp: new Date().toISOString(),
    }, { status: 200 }); // Return 200 to avoid breaking the chat UI
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Chatbot API is running. Use POST to send messages." },
    { status: 200 }
  );
}