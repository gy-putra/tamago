import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/contact",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/admin/login",
  "/api/uploadthing",
  "/api/webhooks(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/admin",
  "/admin/(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/checkout",
  "/orders/(.*)",
  "/wishlist",
  "/all-shoes",
  "/shoes/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip Clerk protection for public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Get user authentication data
  const { userId } = await auth();

  // Handle admin routes - require authentication only
  // Role checking will be done on the client side and in API routes
  if (isAdminRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    // Allow authenticated users to access admin routes
    // Role validation will be handled by individual admin pages/components
  }

  // Protect routes that require Clerk authentication
  if (isProtectedRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
