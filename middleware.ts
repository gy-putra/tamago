import { auth as nextauth } from "@/auth";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/contact",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/admin/login",
  "/api/uploadthing",
]);

const isAdminRoute = createRouteMatcher([
  "/admin",
  "/admin/(.*)",
]);

const isCheckoutRoute = createRouteMatcher([
  "/checkout",
  "/orders/(.*)",
  "/wishlist",
]);

const isProductRoute = createRouteMatcher([
  "/all-shoes",
  "/shoes/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Handle admin routes with NextAuth
  if (isAdminRoute(req) && pathname !== "/admin/login") {
    const session = await nextauth();
    
    if (!session?.user || session.user.email !== "admintamago@gmail.com") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Handle user routes with Clerk - protect checkout, order, and wishlist routes
  if (isCheckoutRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Handle product routes with Clerk - protect product pages
  if (isProductRoute(req)) {
    const { userId } = await auth();
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
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
