"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Menu, 
  Home, 
  ShoppingBag, 
  Phone, 
  Heart, 
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Settings
} from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const SheetNavbar = () => {
  const [open, setOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const wasSignedIn = useRef(isSignedIn);

  // Close sidebar only when user signs out (not when opening the sheet)
  useEffect(() => {
    // Only close if the user was signed in and now is signed out
    if (wasSignedIn.current && !isSignedIn && open) {
      setTimeout(() => setOpen(false), 300);
    }
    // Update the ref to track the current sign-in status
    wasSignedIn.current = isSignedIn;
  }, [isSignedIn, open]);

  // Custom sign out function that handles the modal properly
  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: "/" });
      setOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navigationItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Shop",
      href: "/all-shoes",
      icon: ShoppingBag,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      requiresAuth: true,
    },
    {
      label: "Cart",
      href: "/checkout",
      icon: ShoppingCart,
      requiresAuth: true,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: Phone,
    },
  ];

  return (
    <div className="md:hidden block">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-80 p-0 flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
        >
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
            <SheetTitle className="text-2xl font-bold bg-black bg-clip-text text-transparent">
              TAMAGO.ID
            </SheetTitle>
          </SheetHeader>

          {/* Navigation Body */}
          <div className="flex-1 px-6 py-6 overflow-y-auto">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                
                // Skip auth-required items if user is not signed in
                if (item.requiresAuth && !isSignedIn) {
                  return null;
                }
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                      "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                      "group"
                    )}
                  >
                    <IconComponent className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Admin Dashboard Link */}
              {isSignedIn && user?.publicMetadata?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                    "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30",
                    "text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200",
                    "group"
                  )}
                >
                  <Settings className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              )}
            </nav>

            {/* Authentication Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                    "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30",
                    "text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200",
                    "group"
                  )}
                >
                  <LogIn className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">Sign In</span>
                </Link>
              </SignedOut>
              
              <SignedIn>
                <button
                  onClick={handleSignOut}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 w-full",
                    "hover:bg-red-50 dark:hover:bg-red-900/20",
                    "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400",
                    "group"
                  )}
                >
                  <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </SignedIn>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Theme
              </span>
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetNavbar;