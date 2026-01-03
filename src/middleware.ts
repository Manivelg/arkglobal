// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isLogin = pathname === "/login";
  const isDashboard = pathname.startsWith("/dashboard");

  const isAuthenticated = token ? await verifyJwtToken(token) : null;

  // Logged-in user trying to access login
  if (isLogin && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Logged-out user trying to access dashboard
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};

// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { verifyJwtToken } from "@/lib/jwt";

// export async function middleware(request: NextRequest) {
//   const user = request.cookies.get("user")?.value;
//   const token = request.cookies.get("token")?.value;

//   const pathname = request.nextUrl.pathname;
//   // console.log(user, pathname, "middleware");
//   if (pathname === "/login" && user) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (pathname.startsWith("/dashboard") && !user) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (pathname === "/login") {
//     if (token) {
//       const verified = await verifyJwtToken(token);
//       if (verified) {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//       }
//     }
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/dashboard", "/dash"],
// };
