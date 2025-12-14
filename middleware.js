import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const session = token ? { user: token } : null;

  const { pathname } = request.nextUrl;

  /**
   * PUBLIC ROUTES
   * These are always accessible
   */
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/reset",
    "/error",
    "/test",
  ];

  if (publicRoutes.includes(pathname)) {
    // Logged-in users should not access sign-in
    if (session && pathname === "/sign-in") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  /**
   * ONBOARDING ROUTE (SPECIAL CASE)
   */
  if (pathname === "/onboarding") {
    // ❌ Logged in AND already onboarded → block
    if (session && session.user?.onboarded) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Not logged in OR logged in but not onboarded → allow
    return NextResponse.next();
  }

  /**
   * PROTECTED ROUTES (REQUIRE AUTH)
   */
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  /**
   * LOGGED IN BUT NOT ONBOARDED → FORCE ONBOARDING
   */
  if (!session.user?.onboarded) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
