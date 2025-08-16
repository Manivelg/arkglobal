import React from "react";
import { ClientData } from "../../dashboard/_types";

type Props = {
  data?: ClientData[];
};

function Starter({ data }: Props) {
  return (
    <>
      <div className="">
        {data?.length ? (
          <>
            {data?.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <p>No Data Found</p>
          </>
        )}
      </div>
    </>
  );
}

export default Starter;
