import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminReviewsList from "./_components/AdminReviewsList";

const AdminReviewsPage = async () => {
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
    <div className="container mx-auto px-4 py-10">
      <AdminReviewsList />
    </div>
  );
};

export default AdminReviewsPage;