"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import Image from "next/image";
import TopLine from "@/app/(wap-layout)/common/TopLine";
import { HeaderLists } from "./_actions/header";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (path: string) => {
    setVisible(false);
    setTimeout(() => {
      router.push(path);
    }, 100);
  };

  useEffect(() => {
    const checkInitialScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 30);
    };
    checkInitialScroll();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 30);

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 headLinks transition-transform duration-300 ${
          scrolled ? "bg_set" : "no_bg"
        } ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-2">
          <div className="flex justify-between items-center h-[100px] header_top">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/assets/logo/logo.png"
                  width={300}
                  height={300}
                  className="logo"
                  alt={companyUrl}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-15">
              {HeaderLists.map((desk) => (
                <Link
                  key={desk.id}
                  href={desk.path}
                  className={`header_list ${
                    pathname === desk.path ? "opened" : ""
                  }`}
                >
                  {desk.label}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <Button
                className="burgerMenu"
                icon="pi pi-bars"
                rounded
                text
                onClick={() => setVisible(true)}
              />
            </div>

            {/* Mobile Sidebar Menu */}
            <Sidebar
              visible={visible}
              onHide={() => setVisible(false)}
              className="w-3/4"
            >
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {HeaderLists.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className={`header_list ${
                        pathname === item.path ? "opened" : ""
                      }`}
                      onClick={() => handleNav(item.path)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Sidebar>
          </div>
        </div>
      </header>
      <div className="top_set">
        <TopLine topLineSize="top_line" />
      </div>
    </>
  );
}
