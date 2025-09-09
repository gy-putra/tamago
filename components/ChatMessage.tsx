"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import MiniProductCard from "@/components/MiniProductCard";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  products?: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    averageRating: number;
    totalReviews: number;
  }[];
}

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Debug log to see if products are being received
  // Removed console.log for cleaner terminal output

  // Handle scroll to update current slide indicator
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newSlide = Math.round(scrollLeft / containerWidth);
        setCurrentSlide(newSlide);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -containerWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: containerWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={isUser ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`max-w-[80%] ${isUser ? "text-left" : "text-left"}`}>
        <div
          className={`
            inline-block p-3 rounded-lg text-sm
            ${
              isUser
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-muted text-foreground rounded-bl-none"
            }
          `}
        >
          {message.content}
        </div>
        
        {/* Product Cards (only for assistant messages) */}
        {!isUser && message.products && message.products.length > 0 && (
          <div className="mt-4">
            <div className="relative group">
              {/* Navigation Buttons - Desktop Only */}
              {message.products.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/90 backdrop-blur-sm shadow-md hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={scrollLeft}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/90 backdrop-blur-sm shadow-md hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={scrollRight}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Product Container */}
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full carousel-container"
              >
                {message.products.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-full snap-center">
                    <MiniProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Page Indicator Dots */}
              {message.products.length > 1 && (
                <div className="flex justify-center gap-1 mt-3">
                  {message.products.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentSlide 
                          ? 'bg-blue-500 w-6' 
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageComponent;