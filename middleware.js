import { NextResponse } from "next/server";

const SESSION_COOKIE = "care_session";

export function middleware(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute =
    pathname.startsWith("/my-bookings") || pathname.startsWith("/booking");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (isPrivateRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings/:path*", "/booking/:path*", "/login", "/register"],
};
