"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const PromotionalBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-lg mb-8">
      {/* Background Gradient */}
      <div className="bg-gradient-to-r from-black via-gray-800 to-yellow-600 dark:from-gray-900 dark:via-gray-700 dark:to-yellow-500 p-8 md:p-12">
        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Koleksi Sepatu Terbaru 2025
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Temukan gaya terbaikmu dengan sepatu berkualitas dan orisinal. Temukan pasangan sempurna yang sesuai dengan kepribadian dan gaya hidupmu.
          </p>
          
          {/* CTA Button */}
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <a 
              href="#products" 
              className="inline-flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Shop Now
              <span className="text-xl">→</span>
            </a>
          </Button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full opacity-10 translate-y-12 -translate-x-12"></div>
      </div>
    </div>
  );
};

export default PromotionalBanner;