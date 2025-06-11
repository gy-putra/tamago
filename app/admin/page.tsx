import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ListShoes from "./_components/ListShoes";
import { getAllShoes } from "@/lib/action/shoes.action";

const AdminPage = async () => {
  const session = await auth();
  if (!session) redirect("/");
  if (session?.user?.email !== "admintamago@gmail.com") {
    redirect("/");
  }

  const shoes = await getAllShoes();

  return (
    <main className="md:px-16 px-4 py-10">
      <ListShoes shoes={shoes} />
    </main>
  );
};

export default AdminPage;
