import { Separator } from "@/components/ui/separator";
import { getShoe } from "@/lib/action/shoes.action";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import ReviewSection from "./ReviewSection";
import WishlistButton from "@/components/WishlistButton";

const ShoesDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const shoe = await getShoe(id);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Product Details */}
      <div className="flex md:flex-row flex-col gap-10 mb-16">
        <div className="md:w-1/2 w-full">
          <img src={shoe?.image} alt={shoe?.name} className="rounded-md w-full" />
        </div>
        <div className="md:w-1/2 w-full">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl">NAMA PRODUK</h2>
              <Separator />
              <h3 className="text-md">{shoe?.name}</h3>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl">DESKRIPSI</h2>
              <Separator />
              <p className="text-muted-foreground">{shoe?.description}</p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl">STOK</h2>
              <Separator />
              <p className="text-muted-foreground">{shoe?.stock}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl">PRICE</h3>
              <Separator />
              <p className="text-muted-foreground text-2xl font-bold">
                {formatCurrency(shoe?.price || 0)}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <AddToCartButton
                  product={{
                    id: shoe?.id || "",
                    name: shoe?.name || "",
                    price: shoe?.price || 0,
                    image: shoe?.image || "",
                    stock: shoe?.stock ?? 0,
                  }}
                  className="flex-1"
                  size="lg"
                />
                <WishlistButton 
                  productId={shoe?.id || ""} 
                  className="relative top-0 right-0 bg-white dark:bg-gray-800 border border-input"
                />
              </div>
              <Button asChild variant="secondary" size="lg" className="w-full">
                <Link
                  href={`https://wa.me/6285772723758?text=Halo%20TAMAGO.ID%2C%20saya%20ingin%20bertanya%20tentang%20produk%20${shoe?.name}`}
                >
                  Contact via WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection productId={id} />
    </div>
  );
};

export default ShoesDetail;
