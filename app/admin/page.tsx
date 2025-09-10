import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ListShoes from "./_components/ListShoes";
import { getAllShoes } from "@/lib/action/shoes.action";

const AdminPage = async () => {
  const user = await currentUser();
  
  // Check if user is authenticated and has admin role
  if (!user) {
    redirect("/sign-in");
  }
  
  const userRole = user.publicMetadata?.role as string;
  if (userRole !== "admin") {
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
