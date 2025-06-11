import { Separator } from "@/components/ui/separator";
import { getShoe } from "@/lib/action/shoes.action";
import Link from "next/link";

const ShoesDetail = async ({ params }: { params: { id: string } }) => {
  const shoe = await getShoe(params.id);

  return (
    <div className="flex gap-10 md:px-16 px-4 py-10">
      <div className="w-1/2">
        <img src={shoe?.image} alt={shoe?.name} className="rounded-md" />
      </div>
      <div className="w-1/2">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h2 className="text-2xl">NAMA PRODUK</h2>
            <Separator />
            <h3 className="text-xl">{shoe?.name}</h3>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl">DESKRIPSI</h2>
            <Separator />
            <p className="text-muted-foreground">{shoe?.description}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl">HARGA</h3>
            <Separator />
            <p className="text-muted-foreground">
              Rp. {shoe?.price.toLocaleString("id-ID")}
            </p>
          </div>
          <Link
            className="px-6 py-3 w-full text-center rounded-full cursor-pointer dark:bg-white bg-black dark:text-black text-white"
            href={`https://wa.me/6285772723758?text=Halo%20TAMAGO.ID%2C%20saya%20ingin%20bertanya%20tentang%20produk%20${shoe?.name}`}
          >
            Beli
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoesDetail;
