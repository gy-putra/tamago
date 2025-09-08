import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import WishlistContent from "./_components/WishlistContent";

const WishlistPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="md:px-16 px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">My Wishlist</h1>
        <p className="text-muted-foreground text-center">
          Your favorite products saved for later
        </p>
      </div>
      <WishlistContent />
    </main>
  );
};

export default WishlistPage;