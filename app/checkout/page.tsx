import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CheckoutPage from "./_components/CheckoutPage";

const Checkout = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return <CheckoutPage />;
};

export default Checkout;