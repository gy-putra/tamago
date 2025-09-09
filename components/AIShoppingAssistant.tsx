"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";

const AIShoppingAssistant = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  // Close chat when clicking outside on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const chatWindow = document.querySelector('[data-chat-window]');
      const chatBubble = document.querySelector('[data-chat-bubble]');
      
      if (
        isOpen &&
        chatWindow &&
        !chatWindow.contains(target) &&
        chatBubble &&
        !chatBubble.contains(target) &&
        window.innerWidth >= 768 // Only on desktop
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close chat on mobile when pressing escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Only show the AI assistant on the /all-shoes page
  if (pathname !== "/all-shoes") {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50">
      <div data-chat-bubble>
        <ChatBubble isOpen={isOpen} onClick={toggleChat} />
      </div>
      <div data-chat-window>
        <ChatWindow isOpen={isOpen} onClose={closeChat} />
      </div>
    </div>
  );
};

export default AIShoppingAssistant;