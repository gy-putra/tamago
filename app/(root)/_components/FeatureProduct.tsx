import { getNewShoes, getPricyShoes } from "@/lib/action/shoes.action";
import Image from "next/image";
import Link from "next/link";

const FeatureProduct = async () => {
  const keluaranTerbaru = await getNewShoes();
  const hargaTermurah = await getPricyShoes();

  return (
    <div className="w-full my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 border border-black">
        {keluaranTerbaru?.map((kb, i) => (
          <div
            key={i}
            className="w-full flex md:flex-row flex-col items-center border dark:border-white border-black md:gap-8 gap-4"
          >
            <Image
              src={kb.image}
              width={300}
              height={300}
              alt={kb.name}
              className="md:w-[400px] md:h-[400px] md:max-w-[300px] w-full h-[250px] object-cover"
            />
            <div className="w-1/2 flex flex-col items-center text-center gap-8 md:py-0 py-2">
              <div className="flex flex-col gap-4">
                <p className="font-extralight text-muted-foreground">
                  BELANJA SEKARANG
                </p>
                <h4 className="text-3xl">{kb.name}</h4>
              </div>
              <Link
                href="/all-shoes"
                className="px-6 py-3 w-max rounded-none cursor-pointer dark:bg-white bg-black dark:text-black text-white"
              >
                LIHAT SEMUA
              </Link>
            </div>
          </div>
        ))}

        {hargaTermurah?.map((ht, i) => (
          <div
            key={i}
            className="w-full flex md:flex-row flex-col items-center border dark:border-white border-black md:gap-8 gap-4"
          >
            <Image
              src={ht.image}
              width={300}
              height={300}
              alt={ht.name}
              className="md:w-[400px] md:h-[400px] md:max-w-[300px] w-full h-[250px] object-cover"
            />
            <div className="w-1/2 flex flex-col items-center text-center gap-8 md:py-0 py-2">
              <div className="flex flex-col gap-4">
                <p className="font-extralight text-muted-foreground">
                  BELANJA SEKARANG
                </p>
                <h4 className="text-3xl">{ht.name}</h4>
              </div>
              <Link
                href="/all-shoes"
                className="px-6 py-3 w-max rounded-none cursor-pointer dark:bg-white bg-black dark:text-black text-white"
              >
                LIHAT SEMUA
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
