import React from "react";
import type { Metadata } from "next";
import ShowTable from "./_components/ShowTable";
import Header from "../layout/Header";
import getContactData from "./_actions";

export const metadata: Metadata = {
  title: "ARK Global | Client Contacts",
  description: "Your application dashboard",
};

const Page = async () => {
  const response = await getContactData();
  if (!response) {
    return <h1>Data not found</h1>;
  }

  return (
    <>
      <Header />
      <ShowTable data={response.data} />
    </>
  );
};

export default Page;
