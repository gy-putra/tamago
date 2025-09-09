"use client";

import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatBubble = ({ isOpen, onClick }: ChatBubbleProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        size="lg"
        className={`
          h-14 w-14 rounded-full shadow-lg transition-all duration-300 
          hover:scale-110 hover:shadow-xl active:scale-95
          bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
          text-white border-0 animate-pulse hover:animate-none
          ${isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
        `}
        aria-label={isOpen ? "Close chat" : "Open AI assistant chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default ChatBubble;