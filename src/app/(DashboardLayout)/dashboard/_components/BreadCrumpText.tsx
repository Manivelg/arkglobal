import React from "react";
import SearchInput from "./SearchInput";

type BreadCrumpTextProps = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
};

export default function BreadCrumpText({
  globalFilter,
  setGlobalFilter,
}: BreadCrumpTextProps) {
  return (
    <>
      <div className="bg-white flex justify-between border-solid border-gray-200 border-1 px-3 py-2 items-center rounded-lg">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center">
            <i
              className="pi pi-home"
              style={{ fontSize: "1rem", color: "#7d7d7d" }}
            ></i>
          </div>
          <div className="text-sm text-[#5e5a5a] cursor-default">
            Clients Contact Information
          </div>
        </div>
        <div className="text-sm flex items-center justify-center">
          <SearchInput
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search..."
          />
        </div>
      </div>
    </>
  );
}
