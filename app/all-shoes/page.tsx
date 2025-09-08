import { getAllShoes } from "@/lib/action/shoes.action";
import ListAllShoes from "./_components/ListAllShoes";
import PromotionalBanner from "./_components/PromotionalBanner";
import ProductSort, { SortOption } from "./_components/ProductSort";

interface AllShoesPageProps {
  searchParams: Promise<{ sort?: SortOption }>;
}

const AllShoesPage = async ({ searchParams }: AllShoesPageProps) => {
  const { sort = "newest" } = await searchParams;
  const shoes = await getAllShoes(sort);

  return (
    <main className="md:px-16 px-4 py-10">
      <PromotionalBanner />
      <div id="products" className="mt-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Our Products</h2>
          <p className="text-muted-foreground text-center mb-6">Discover our complete collection of premium shoes</p>
          
          {/* Sort Component */}
          <div className="flex justify-center md:justify-start">
            <ProductSort currentSort={sort} />
          </div>
        </div>
        <ListAllShoes shoes={shoes} />
      </div>
    </main>
  );
};

export default AllShoesPage;
