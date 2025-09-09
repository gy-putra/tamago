import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper function to format currency
const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

export interface ProductData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  averageRating: number;
  totalReviews: number;
  soldCount: number;
  isBestseller: boolean;
  stock?: number;
  description?: string;
  createdAt: Date;
}

export interface GroqChatRequest {
  userMessage: string;
  productData: ProductData[];
}

export interface GroqChatResponse {
  response: string;
  products: ProductData[];
}

export async function callGroqAI({ userMessage, productData }: GroqChatRequest): Promise<GroqChatResponse> {
  try {
    // Prepare product data for the AI context
    const productContext = {
      popular_products: productData
        .sort((a, b) => b.soldCount - a.soldCount)
        .slice(0, 5)
        .map(product => ({
          name: product.name,
          price: product.price,
          original_price: product.originalPrice,
          rating: product.averageRating,
          reviews: product.totalReviews,
          sold_count: product.soldCount,
          is_bestseller: product.isBestseller,
          stock: product.stock,
          description: product.description
        })),
      highest_rated: productData
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 5)
        .map(product => ({
          name: product.name,
          price: product.price,
          original_price: product.originalPrice,
          rating: product.averageRating,
          reviews: product.totalReviews,
          sold_count: product.soldCount,
          is_bestseller: product.isBestseller
        })),
      newest_products: productData
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(product => ({
          name: product.name,
          price: product.price,
          original_price: product.originalPrice,
          rating: product.averageRating,
          reviews: product.totalReviews,
          is_new: true
        })),
      bestsellers: productData
        .filter(product => product.isBestseller)
        .map(product => ({
          name: product.name,
          price: product.price,
          original_price: product.originalPrice,
          rating: product.averageRating,
          reviews: product.totalReviews,
          sold_count: product.soldCount
        }))
    };

    const systemPrompt = `You are an AI Shopping Assistant for TAMAGO.ID, a premium shoe store.
    
Your personality:
- Friendly, enthusiastic, and helpful
- Concise and to-the-point
- Use emojis sparingly but appropriately
- Always stay positive and encouraging

IMPORTANT Guidelines:
- Provide ONLY short, introductory responses (1-2 sentences maximum)
- DO NOT include product details, prices, or specifications in your text
- DO NOT describe products - the UI will show product cards with all details
- Your role is to provide context and friendly introductions only
- The product information will be displayed in cards below your message

Example responses:
- "Here are our most popular shoes! 👟"
- "I found some highly-rated options for you:"
- "Check out our bestsellers:"
- "Our newest arrivals just for you:"
- "These products match what you're looking for:"

Product Data Available:
${JSON.stringify(productContext, null, 2)}

Remember: Keep your response SHORT and let the product cards do the talking!`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.1-8b-instant", // Using LLaMA 3.1 8B Instant model
      temperature: 0.3, // Lower temperature for more consistent, concise responses
      max_tokens: 100, // Reduced max tokens for short responses
      top_p: 1,
      stream: false
    });

    // Determine which products to show based on user query
    let relevantProducts: ProductData[] = [];
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('popular') || lowerMessage.includes('bestseller') || lowerMessage.includes('best selling') ||
        lowerMessage.includes('terlaris') || lowerMessage.includes('best seller') || lowerMessage.includes('populer')) {
      relevantProducts = productData
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 3);
    } else if (lowerMessage.includes('rated') || lowerMessage.includes('rating') || lowerMessage.includes('review') ||
               lowerMessage.includes('terbaik') || lowerMessage.includes('bagus') || lowerMessage.includes('berkualitas')) {
      relevantProducts = productData
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 3);
    } else if (lowerMessage.includes('new') || lowerMessage.includes('latest') || lowerMessage.includes('recent') ||
               lowerMessage.includes('baru') || lowerMessage.includes('terbaru')) {
      relevantProducts = productData
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('help me find') ||
               lowerMessage.includes('rekomen') || lowerMessage.includes('sarankan') || lowerMessage.includes('bantu cari')) {
      // Show a mix of popular and highly rated products
      const popular = productData.sort((a, b) => b.soldCount - a.soldCount).slice(0, 2);
      const highRated = productData.sort((a, b) => b.averageRating - a.averageRating).slice(0, 1);
      relevantProducts = [...popular, ...highRated];
    } else {
      // Default: show some popular products for any product-related query
      if (lowerMessage.includes('produk') || lowerMessage.includes('sepatu') || lowerMessage.includes('shoe') || lowerMessage.includes('product')) {
      relevantProducts = productData
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 2);
      }
    }
    
    return {
      response: completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request. Please try again.",
      products: relevantProducts
    };

  } catch (error) {
    console.error("Groq AI Error:", error);
    
    // Fallback response if Groq fails
    if (userMessage.toLowerCase().includes('popular') || userMessage.toLowerCase().includes('bestseller') ||
        userMessage.toLowerCase().includes('terlaris') || userMessage.toLowerCase().includes('best seller')) {
      const popularProducts = productData
        .sort((a, b) => b.soldCount - a.soldCount)
        .slice(0, 3);
      
      return {
        response: `Here are our most popular shoes! 👟`,
        products: popularProducts
      };
    }
    
    return {
      response: "I'm having some technical difficulties right now, but I'd love to help you find the perfect shoes! 😊",
      products: []
    };
  }
}

export default groq;