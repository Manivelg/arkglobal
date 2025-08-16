// // lib/authFetch.ts
// import { logout } from "@/app/(DashboardLayout)/dashboard/_actions/logout";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// const isTokenValid = (token: string): boolean => {
//   try {
//     const decoded = jwtDecode<any>(token);
//     return decoded.exp > Date.now() / 1000;
//   } catch {
//     return false;
//   }
// };

// export const authFetch = async (url: string, options: RequestInit = {}) => {
//   const token = Cookies.get("token");

//   if (!token || !isTokenValid(token)) {
//     logout();
//     throw new Error("Session expired. Please log in again.");
//   }

//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (response.status === 401) {
//     logout();
//   }

//   return response;
// };

import { logout } from "@/app/(DashboardLayout)/dashboard/_actions/logout";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthTokenPayload {
  exp: number;
  // Add other expected token properties here
  [key: string]: unknown;
}

const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<AuthTokenPayload>(token);
    return !!decoded.exp && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = Cookies.get("token");

  if (!token || !isTokenValid(token)) {
    await logout();
    throw new Error("Session expired. Please log in again.");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    await logout();
  }

  return response;
};
