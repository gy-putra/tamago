# AI Shopping Assistant - Groq Integration Setup

## Overview
The AI Shopping Assistant now uses **Groq AI** with LLaMA 3.1 8B model to provide intelligent, context-aware responses based on your product database.

## Setup Instructions

### 1. Get Groq API Key
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables
Update your `.env.local` file with your Groq API key:

```env
# Groq AI
GROQ_API_KEY="your_actual_groq_api_key_here"
```

### 3. Restart Development Server
After adding the API key, restart your development server:
```bash
npm run dev
```

## Features

### AI Capabilities
- **Context-Aware**: AI knows about your actual product inventory
- **Product Categories**: Popular products, highest-rated, newest arrivals, bestsellers
- **Smart Responses**: Understands shopping queries and provides relevant recommendations
- **Fallback System**: Gracefully handles API failures with database-based responses

### Supported Query Types
1. **Popular Products**: "What products are popular this month?"
2. **Highest Rated**: "What are the highest-rated shoes?"
3. **New Arrivals**: "Any new shoe recommendations?"
4. **Bestsellers**: "Show me your bestseller items"
5. **Price Inquiries**: "What's your price range?"
6. **General Help**: "Help me find shoes"

### Response Format
- Friendly, conversational tone
- Indonesian Rupiah pricing (Rp xxx,xxx)
- Product-specific details (ratings, sales numbers, discounts)
- Emoji usage for better engagement

## Technical Details

### Files Modified/Added
- `lib/groq.ts` - Groq AI client and helper functions
- `app/api/chatbot/route.ts` - Updated to use Groq AI
- `.env.local` - Environment variables

### AI Model Configuration
- **Model**: llama-3.1-8b-instant (LLaMA 3.1 8B Instant)
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Max Tokens**: 500 (concise responses)
- **Context**: Real-time product data from database

### Database Integration
The AI assistant queries your Prisma database to get:
- Product details (name, price, description)
- Review data (ratings, review counts)
- Sales data (sold counts)
- Bestseller status
- Stock information

## Testing the Integration

### Sample Conversations
Try these questions in the chat:

1. **"What products are popular this month?"**
   - Expected: List of top-selling products with sales numbers

2. **"What are the highest-rated shoes?"**
   - Expected: Products sorted by customer ratings

3. **"Any new shoe recommendations?"**
   - Expected: Recently added products

4. **"Show me bestsellers under Rp 500,000"**
   - Expected: Filtered bestseller products within budget

5. **"Help me find running shoes"**
   - Expected: Relevant product recommendations (if available in database)

### Expected Behavior
- ✅ Natural, conversational responses
- ✅ Accurate product information
- ✅ Proper Rupiah formatting
- ✅ Contextual recommendations
- ✅ Fallback responses if Groq API fails

## Troubleshooting

### Common Issues

1. **"API Key Error"**
   - Ensure GROQ_API_KEY is correctly set in .env.local
   - Verify the API key is valid on Groq console
   - Restart the development server

2. **"Empty Responses"**
   - Check if your database has products
   - Verify Prisma connection is working
   - Check console for error messages

3. **"Fallback Responses Only"**
   - Check internet connection
   - Verify Groq API service status
   - Check API quota limits

### Debugging
- Check browser console for error messages
- Monitor server logs in terminal
- Test API endpoint directly: `POST /api/chatbot`

## Production Deployment

### Environment Variables for Production
Ensure these are set in your production environment:
```env
GROQ_API_KEY=your_production_groq_api_key
DATABASE_URL=your_production_database_url
```

### Performance Considerations
- API responses typically take 1-3 seconds
- Database queries are optimized for product context
- Fallback system ensures reliability
- Rate limiting is handled by Groq service

## Future Enhancements

### Possible Improvements
1. **User Personalization**: Remember user preferences
2. **Product Recommendations**: ML-based suggestions
3. **Multi-language Support**: Indonesian and English responses
4. **Voice Integration**: Speech-to-text capabilities
5. **Image Understanding**: Product image analysis

### Model Upgrades
- Switch to larger models (70B) for more sophisticated responses
- Fine-tuning on shoe/fashion domain data
- Custom training on your product catalog

## Support
If you encounter issues:
1. Check this documentation first
2. Review console error messages
3. Test with sample queries
4. Verify environment configuration

The AI Shopping Assistant is now powered by cutting-edge AI technology while staying grounded in your actual product data!