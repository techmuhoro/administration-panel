import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} request
 */
export default function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const authToken = request.cookies.get("token");

    if (!authToken) {
      // redirect use to the login page
      const loginUrl = new URL(
        `/?next=${request.nextUrl.pathname}`,
        request.url
      );

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
