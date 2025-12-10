import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const session = token ? { user: token } : null;

  const pathname = request.nextUrl.pathname;

  // Add "/" as an allowed public route
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/reset",
    "/error",
    "/test",
  ];

  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  // Not logged in → redirect to sign-in (except onboarding)
  if (!session) {
    if (pathname === "/onboarding") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Logged in but going to onboarding when already onboarded → redirect home
  if (pathname === "/onboarding" && session.user?.onboarded) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Logged in but NOT onboarded → force onboarding
  if (pathname !== "/onboarding" && !session.user?.onboarded) {
    const mainRoutes = ["/", "/chatbox", "/posts", "/reels", "/stories"];
    const isAccessingMainRoute = mainRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAccessingMainRoute) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
