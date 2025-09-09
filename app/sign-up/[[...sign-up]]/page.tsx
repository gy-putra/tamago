import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface SignUpPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
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
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join TAMAGO.ID to explore our premium shoe collection
          </p>
        </div>
        
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "shadow-lg",
              },
            }}
            routing="hash"
            forceRedirectUrl={redirect_url || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
            fallbackRedirectUrl={redirect_url || process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SignUpPage;