"use client";
import React from "react";
import { useRouter } from "next/navigation";
import NotFound from "./NotFound";

function ErrorPage() {
  const router = useRouter();

  return (
    <section className="not_found">
      <div className="container mx-auto px-2">
        <NotFound onBack={() => router.push("/")} />
      </div>
    </section>
  );
}

export default ErrorPage;
