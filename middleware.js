import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/reset",
    "/error",
    "/test",
    "/new-verification",
  ];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isOnboardingRoute = pathname === "/onboarding";

  // 1. If NOT logged in
  if (!token) {
    // Only let them see the public landing/auth pages
    if (isPublicRoute) {
      return NextResponse.next();
    }
    // Everything else (onboarding, dashboard, settings) is blocked
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 2. If LOGGED IN but NOT onboarded
  if (!token.onboarded) {
    // Allow them to be on the onboarding page
    if (isOnboardingRoute) {
      return NextResponse.next();
    }
    // Force them back to onboarding if they try to leave
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // 3. If logged in AND onboarded
  // Prevent them from going to login/signup or back to onboarding
  if (isPublicRoute && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isOnboardingRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
