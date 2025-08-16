"use client";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BreadCrumpText from "./BreadCrumpText";
import { ClientData } from "../_types";
import { format } from "date-fns";

type Props = {
  data?: ClientData[];
};

export default function ShowTable({ data = [] }: Props) {
  const paginatorLeft = <></>;
  const paginatorRight = <></>;
  const [globalFilter, setGlobalFilter] = useState("");

  // const serialNumberBody = (_: any, options: any) => options.rowIndex + 1;

  return (
    <div className="client_data p-5 font-poppins">
      <div className="pb-5">
        <BreadCrumpText
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="border-1 border-solid border-gray-200 rounded-2xl overflow-hidden">
        <DataTable
          globalFilter={globalFilter}
          globalFilterFields={[
            "id",
            "name",
            "company",
            "email",
            "mobile",
            "message",
            "date",
            "count",
          ]}
          value={data}
          tableStyle={{ width: "100%" }}
          sortMode="multiple"
          removableSort
          paginator
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          rows={10}
        >
          <Column
            body={(rowData, options) => options.rowIndex + 1}
            header="S.No"
            sortable={false}
          ></Column>
          <Column
            field="name"
            header="Name"
            className="text-sm capitalize"
            sortable
          ></Column>
          <Column
            field="company"
            header="Company"
            className="max-w-[200px] text-sm"
            sortable
          ></Column>
          <Column
            field="email"
            header="Email ID"
            className="text-sm"
            sortable
          ></Column>
          <Column
            field="mobile"
            header="Mobile No"
            className="text-sm"
            sortable
          ></Column>
          <Column
            field="message"
            header="Message"
            className="text-sm w-[25%]"
            sortable
          ></Column>
          <Column
            field="date"
            header="Date"
            className="text-sm"
            sortable
            body={(rowData) => {
              const dateFormat =
                process.env.NEXT_PUBLIC_DATE_FORMAT || "dd-MM-yyyy"; // Note lowercase dd

              const date = new Date(rowData.date);
              const timeset = format(date, "HH:mm a");
              const dateset = format(new Date(rowData.date), dateFormat);
              return (
                <>
                  <div className="flex gap-2 items-center">
                    <p className="text-[0.875rem]">{dateset}</p>
                    <span className="px-3 py-1 text-[0.75rem] text-[#00ceb6] bg-[#daf8f4] rounded-full">
                      {timeset}
                    </span>
                  </div>
                </>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
