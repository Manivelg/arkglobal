import ConfirmPassword from "./_components/ConfirmPassword";
import Image from "next/image";
import { Suspense } from "react";

export default function Page() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";

  return (
    <section className="w-full h-full">
      <div className="grid grid-cols-12 sm:gap-0 md:gap-5">
        <div className="col-span-12 md:col-span-6 relative">
          <div className="bg-[#1b4f72] w-full h-dvh absolute"></div>
        </div>
        <div className="col-span-12 md:col-span-6 relative">
          <div className="w-full h-dvh absolute">
            <div className="flex flex-col justify-center items-center h-dvh gap-10">
              <div className="max-w-[400px] min-w-[400px] flex flex-col gap-4 justify-center items-baseline">
                <div className="flex justify-center w-full">
                  <Image
                    src="/assets/logo/logo.png"
                    width={300}
                    height={300}
                    className="w-4/5"
                    alt={companyUrl}
                  />
                </div>
                <div className="w-full">
                  <Suspense>
                    <ConfirmPassword />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
