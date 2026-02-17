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
  const token = request.cookies.get("token")?.value || null;
  const { pathname } = request.nextUrl;

  const JWT_SECRET = process.env.JWT_SECRET;

  // Check for missing JWT_SECRET
  if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing in environment variables");

    // In production, still handle the request but log the error
    if (process.env.NODE_ENV === "production") {
      console.error(
        "Production: JWT_SECRET is missing - authentication will fail",
      );

      // If trying to access protected routes, redirect to login
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  let isAuthenticated = false;

  if (token && JWT_SECRET) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      isAuthenticated = true;
      // console.log("✅ JWT Verified");
    } catch (err) {
      // Fix: Properly handle unknown error type
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      // console.log("❌ JWT verification failed:", errorMessage);
      isAuthenticated = false;
    }
  } else if (!token) {
    console.warn("No token found");
  }

  // console.log("Path:", pathname);
  // console.log("Authenticated:", isAuthenticated);

  // Protected routes
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    // console.log("➡ Redirecting to /login");
    const loginUrl = new URL("/login", request.url);
    // Add return URL to redirect back after login
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login
  if (pathname === "/login" && isAuthenticated) {
    // console.log("➡ Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

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
