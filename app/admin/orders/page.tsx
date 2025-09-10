import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminOrdersList from "./_components/AdminOrdersList";

const AdminOrdersPage = async () => {
  const user = await currentUser();
  
  // Check if user is authenticated and has admin role
  if (!user) {
    redirect("/sign-in");
  }
  
  const userRole = user.publicMetadata?.role as string;
  if (userRole !== "admin") {
    redirect("/");
  }

  return (
    <main className="md:px-16 px-4 py-10">
      <AdminOrdersList />
    </main>
  );
};

export default AdminOrdersPage;