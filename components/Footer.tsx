import { IconBrandShopee } from "@tabler/icons-react";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-8 bg-black dark:bg-white text-white dark:text-black mt-32">
      <div className="flex justify-center items-center flex-col gap-10">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl tracking-widest">SHOES</h3>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4 text-muted-foreground tracking-widest ">
          <Link href="/">BERANDA</Link>
          <Link href="/all-shoes">PRODUK</Link>
          <Link href="/contact">
            KONTAK
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/">
            <Facebook />
          </Link>
          <Link href="/">
            <Instagram />
          </Link>
          <Link href="/">
            <IconBrandShopee />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;