import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth(); // ini ambil session user

  const { pathname } = request.nextUrl;

  // Kalau user udah login dan akses /sign-in, redirect ke /admin
  if (pathname === "/sign-in" && session?.user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Kalau admin belum login dan akses /admin, redirect ke /sign-in
  if (pathname.startsWith("/admin") && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next(); // lanjut ke halaman biasa
}
