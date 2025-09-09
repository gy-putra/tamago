import Link from "next/link";
import SheetNavbar from "./SheetNavbar";
import { ModeToggle } from "./ModeToggle";
import CartIcon from "./CartIcon";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Heart } from "lucide-react";

const navItems = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Produk",
    href: "/all-shoes",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center justify-between md:px-16 px-4 py-4 gap-4">
        <Link href={"/"} className="flex items-center">
          <h3 className="text-sm sm:text-3xl brand-logo">TAMAGO.ID</h3>
        </Link>
        <div className="md:flex hidden gap-4 items-center">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="relative after:content-[''] after:absolute after:-bottom-1 after:right-0 after:h-[2px] after:w-full after:bg-black dark:after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {item.name}
            </Link>
          ))}
          <CartIcon />
          <SignedIn>
            <Link 
              href="/wishlist" 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="border px-4 py-2 rounded-full">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <ModeToggle />
        </div>
        
        {/* Mobile Icons and Menu */}
        <div className="md:hidden flex items-center gap-3">
          <SignedIn>
            <Link 
              href="/wishlist" 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Wishlist"
            >
              <Heart className="h-4 w-4" />
            </Link>
          </SignedIn>
          <CartIcon />
          <SheetNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;