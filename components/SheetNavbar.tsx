import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fingerprint } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const SheetNavbar = () => {

  return (
    <div className="md:hidden block">
      <Sheet>
        <SheetTrigger>
          <Fingerprint className="w-6 h-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-3xl brand-logo">TAMAGO.ID</SheetTitle>
          </SheetHeader>
          <div className="px-4 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="border px-6 py-3 rounded-full shadow-md"
              >
                HOME
              </Link>

              <Link
                href="/contact"
                className="border px-6 py-3 rounded-full shadow-md"
              >
                CONTACT
              </Link>
              <Link
                href="/all-shoes"
                className="border px-6 py-3 rounded-full shadow-md"
              >
                SHOP
              </Link>
            </div>
            <div className="flex justify-center">
              <ModeToggle />
            </div>
            <div className="flex flex-col gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="border px-6 py-3 rounded-full shadow-md">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetNavbar;
