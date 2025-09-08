import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminReviewsList from "./_components/AdminReviewsList";

const AdminReviewsPage = async () => {
  const session = await auth();
  
  if (!session || session.user?.email !== "admintamago@gmail.com") {
    redirect("/admin/login");
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <AdminReviewsList />
    </div>
  );
};

export default AdminReviewsPage;