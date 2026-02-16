// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function proxy(request: NextRequest) {
//   const JWT_SECRET = process.env.JWT_SECRET;

//   if (!JWT_SECRET) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const secret = new TextEncoder().encode(JWT_SECRET);

//   const token = request.cookies.get("token")?.value;
//   const pathname = request.nextUrl.pathname;

//   const isLogin = pathname === "/login";
//   const isDashboard = pathname.startsWith("/dashboard");

//   let isAuthenticated = false;

//   if (token) {
//     try {
//       await jwtVerify(token, secret);
//       isAuthenticated = true;
//     } catch {
//       isAuthenticated = false;
//     }
//   }

//   if (isLogin && isAuthenticated) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (isDashboard && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/dashboard/:path*"],
// };

// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.log("❌ JWT_SECRET is missing in production");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let isAuthenticated = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      isAuthenticated = true;
      console.log("JWT Verified ✅");
    } catch (err) {
      console.log("JWT verification failed ❌", err);
      isAuthenticated = false;
    }
  }

  console.log("Path:", pathname);
  console.log("Token exists:", !!token);
  console.log("Authenticated:", isAuthenticated);

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    console.log("➡ Redirecting to /login", request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && isAuthenticated) {
    console.log("➡ Redirecting to /dashboard", request.url);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log("Allowing request ✅");
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};

// src/middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { verifyJwtToken } from "@/lib/jwt";

// export async function proxy(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const pathname = request.nextUrl.pathname;

//   const isLogin = pathname === "/login";
//   const isDashboard = pathname.startsWith("/dashboard");

//   const isAuthenticated = token ? await verifyJwtToken(token) : null;

//   if (isLogin && isAuthenticated) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (isDashboard && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/dashboard/:path*"],
// };

// src/proxy.ts
// import { NextRequest, NextResponse } from "next/server";
// import { verifyJwtToken } from "@/lib/jwt";

// export async function proxy(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const pathname = request.nextUrl.pathname;

//   const isLogin = pathname === "/login";
//   const isDashboard = pathname.startsWith("/dashboard");

//   const isAuthenticated = token ? await verifyJwtToken(token) : null;

//   if (isLogin && isAuthenticated) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (isDashboard && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/dashboard/:path*"],
// };

// middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { verifyJwtToken } from "@/lib/jwt";

// export async function proxy(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const pathname = request.nextUrl.pathname;

//   const isLogin = pathname === "/login";
//   const isDashboard = pathname.startsWith("/dashboard");

//   const isAuthenticated = token ? await verifyJwtToken(token) : null;

//   // Logged-in user trying to access login
//   if (isLogin && isAuthenticated) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Logged-out user trying to access dashboard
//   if (isDashboard && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/dashboard/:path*"],
// };

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
