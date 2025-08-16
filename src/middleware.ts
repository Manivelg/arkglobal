// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value;
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;
  // console.log(user, pathname, "middleware");
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login") {
    if (token && verifyJwtToken(token)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// const pathname = request.nextUrl.pathname;
// const token = request.cookies.get("token")?.value;

// if (pathname === "/login") {
//   if (token && verifyJwtToken(token)) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   return NextResponse.next();
// }

// if (pathname.startsWith("/dashboard")) {
//   if (!token || !verifyJwtToken(token)) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   return NextResponse.next();
// }

// const token = request.cookies.get("token")?.value;

// if (!token || !verifyJwtToken(token)) {
//   return NextResponse.redirect(new URL("/login", request.url));
// }

//   return NextResponse.next();
// }

export const config = {
  matcher: ["/login", "/dashboard", "/dash"],
};

// middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const protectedRoutes = ["/dashboard"]; // Add your protected routes

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   if (protectedRoutes.some((route) => path.startsWith(route))) {
//     const token = request.cookies.get("token")?.value;

//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     try {
//       jwt.verify(token, process.env.JWT_SECRET!);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }
