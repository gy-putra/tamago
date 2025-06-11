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
import { auth } from "@/auth";

const SheetNavbar = async () => {
  const session = await auth();

  return (
    <div className="md:hidden block">
      <Sheet>
        <SheetTrigger>
          <Fingerprint className="w-6 h-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-3xl">TAMAGO.ID</SheetTitle>
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
                href="https://wa.me/6285772723758?text=Halo%20TAMAGO.ID%2C%20saya%20ingin%20bertanya%20tentang%20produk%20anda"
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
            <Link
              href={session ? "/admin" : "/sign-in"}
              className="border px-6 text-center py-3 rounded-full shadow-md bg-indigo-500"
            >
              ADMIN
            </Link>
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetNavbar;
