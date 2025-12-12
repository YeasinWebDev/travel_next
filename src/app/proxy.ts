import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
import { removeCookie } from "./tokenHandler";

export enum IUserRole {
  USER = "user",
  ADMIN = "admin",
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: IUserRole | null = null;

  if (accessToken) {
    try {
      const decodedToken = Jwt.decode(accessToken) as Jwt.JwtPayload;
      userRole = decodedToken.role as IUserRole;
    } catch (error) {
      console.log(error);
      await removeCookie("accessToken");
      await removeCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && pathname.startsWith("/trips/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (userRole === IUserRole.ADMIN) return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User route protection
  if (pathname.startsWith("/user")) {
    if (userRole === IUserRole.USER) return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Public route, allow access
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
