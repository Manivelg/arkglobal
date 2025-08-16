"use server";

const getContactDatas = async () => {
  const res = await fetch("https://auth.devcri.com/api/products/list");
  const data = res.json();
  return data;
};

export default getContactDatas;
