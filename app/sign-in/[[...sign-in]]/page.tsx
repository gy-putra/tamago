import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface SignInPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  // Check if user is already authenticated
  const { userId } = await auth();
  const { redirect_url } = await searchParams;
  
  // If user is already authenticated, redirect them
  if (userId) {
    redirect(redirect_url || "/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access our exclusive shoe collection and manage your wishlist
          </p>
        </div>
        
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "shadow-lg",
              },
            }}
            routing="hash"
            signUpUrl="/sign-up"
            forceRedirectUrl={redirect_url || "/"}
            fallbackRedirectUrl={redirect_url || "/"}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SignInPage;