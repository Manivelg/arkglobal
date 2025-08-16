// app/actions.ts
"use server";

import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function logout() {
  const removeCookies = await cookies();
  removeCookies.delete("user");
  removeCookies.delete("token");
  // redirect("/login");
}
