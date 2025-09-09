import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

interface SignInPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { redirect_url } = await searchParams;
  
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
            forceRedirectUrl={redirect_url || "/all-shoes"}
            fallbackRedirectUrl={redirect_url || "/all-shoes"}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SignInPage;