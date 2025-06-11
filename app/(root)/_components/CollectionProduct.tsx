import { takeFourShoes } from "@/lib/action/shoes.action";
import Image from "next/image";
import Link from "next/link";

const CollectionProduct = async () => {
  const shoes = await takeFourShoes();

  return (
    <div className="w-full flex flex-col mb-10">
      <div className="flex flex-col justify-center items-center gap-2 mt-10 mb-10">
        <p className="text-muted-foreground tracking-widest">COLLECTION</p>
        <h3 className="text-3xl tracking-widest">KOLEKSI KAMI</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {shoes?.map((shoe) => (
          <Link
            href="/"
            key={shoe.id}
            className="flex flex-col items-center justify-center gap-2 border dark:border-white border-black"
          >
            <Image
              src={shoe.image}
              width={300}
              height={300}
              alt={shoe.name}
              className="w-full h-[200px] object-cover"
            />
            <div className="flex flex-col gap-2 my-4 text-center">
              <p className="text-muted-foreground tracking-widest">
                {shoe.name}
              </p>
              <p className="text-muted-foreground tracking-widest">
                Rp. {shoe.price.toLocaleString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/all-shoes"
        className="text-center px-6 py-3 dark:bg-white dark:text-black bg-black text-white"
      >
        BELANJA SEKARANG
      </Link>
    </div>
  );
};

export default CollectionProduct;
