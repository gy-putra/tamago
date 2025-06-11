import Link from "next/link";
import SheetNavbar from "./SheetNavbar";
import { ModeToggle } from "./ModeToggle";
import { auth } from "@/auth";
import SignOut from "@/app/(auth)/_components/SignOut";

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
    href: "https://wa.me/6285772723758?text=Halo%20TAMAGO.ID%2C%20saya%20ingin%20bertanya%20tentang%20produk%20anda",
  },
];

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center justify-between md:px-16 px-4 py-4 gap-4">
        <Link href={"/"} className="flex items-center">
          <h3 className="text-3xl">TAMAGO.ID</h3>
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
          <Link
            href={session ? "/admin" : "/sign-in"}
            className="border px-4 py-2 rounded-full"
          >
            ADMIN
          </Link>
          {session && <SignOut />}
          <ModeToggle />
        </div>
        <SheetNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
