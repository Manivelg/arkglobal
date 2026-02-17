// "use server";

// import { cookies } from "next/headers";

// export async function logout() {
//   (await cookies()).delete("token");

//   return { success: true };
// }

// app/actions.ts
// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function logout() {
//   const cookieStore = cookies();

//   (await cookieStore).delete("token");
//   (await cookieStore).delete("user"); // optional (JWT is source of truth)

//   redirect("/login");
// }

// // app/actions.ts
"use server";

import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function logout() {
  const removeCookies = await cookies();
  removeCookies.delete("user");
  removeCookies.delete("token");
  // redirect("/login");
}
