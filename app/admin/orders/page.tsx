import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminOrdersList from "./_components/AdminOrdersList";

const AdminOrdersPage = async () => {
  const session = await auth();
  
  if (!session) redirect("/");
  if (session?.user?.email !== "admintamago@gmail.com") {
    redirect("/");
  }

  return (
    <main className="md:px-16 px-4 py-10">
      <AdminOrdersList />
    </main>
  );
};

export default AdminOrdersPage;