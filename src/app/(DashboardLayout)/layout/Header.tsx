"use client";
import React, { useRef, useEffect, useState } from "react";
import { Image } from "primereact/image";
import { Tooltip } from "primereact/tooltip";
import { OverlayPanel } from "primereact/overlaypanel";
import { logout } from "../dashboard/_actions/logout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";

  const op = useRef<OverlayPanel>(null);

  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    op.current?.toggle(e);
  };

  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user cookie", error);
      }
    }
  }, []);

  const Logout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <section className="px-4 sticky top-0 shadow-sm z-50 bg-white font-poppins">
        <div className="flex justify-between h-[80px] items-center w-full">
          <div>
            <Image
              src="/assets/logo/logo.png"
              alt={companyUrl}
              width="300"
              height="100"
              className="w-full company_logo"
              title={companyUrl}
            />
          </div>
          <div>
            <Tooltip
              content="User"
              position="left"
              target=".user_icon"
              showDelay={1000}
              hideDelay={300}
            />
            <div
              className="w-[50px] h-[50px] bg-[#1b4f72] p-2 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-500"
              onClick={handleAvatarClick}
            >
              <i className="user_icon cursor-pointer text-white pi pi-user" />
            </div>
            <OverlayPanel ref={op}>
              <div className="w-[200px]">
                <div className="flex justify-start gap-4 items-center">
                  <div className="">
                    <i className="pi pi-user"></i>
                  </div>
                  <div className="">
                    <p className="text-sm font-medium">Hi!</p>
                    <p className="truncate text-sm text-[#1b4f72] capitalize cursor-default">
                      {user?.username || "Guest"}
                    </p>
                  </div>
                </div>
                <hr className="mt-3 mb-3 border-[#e1e1e1]" />
                <div className="flex justify-start gap-4 items-center p-2 rounded-md cursor-pointer hover:text-[#1b4f72] hover:bg-[#f2f2f2]">
                  <div className="">
                    <i className="pi pi-sign-out"></i>
                  </div>
                  <div className="">
                    <form action={logout}>
                      <button type="submit">Logout</button>
                    </form>
                  </div>
                </div>
              </div>
            </OverlayPanel>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
