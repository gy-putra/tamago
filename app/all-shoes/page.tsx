import { getAllShoes } from "@/lib/action/shoes.action";
import ListAllShoes from "./_components/ListAllShoes";

const AllShoesPage = async () => {
  const shoes = await getAllShoes();

  return (
    <main className="md:px-16 px-4 py-10">
      <ListAllShoes shoes={shoes} />
    </main>
  );
};

export default AllShoesPage;
