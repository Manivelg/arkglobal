import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { ClientLists } from "../_actions";

function Clients() {
  return (
    <section className="clients">
      <div className="client_header">
        <h2 className="clientHead">
          Trusted by <span className="clientblock">Clients Worldwide</span>
        </h2>
        <Marquee pauseOnHover={false} loop={50} gradient>
          {ClientLists[0].data.map((e) => (
            <div className="client_group" key={e.id}>
              <Image
                key={e.id}
                src={`${e.clientImg}`}
                width={200}
                height={100}
                className="client_img"
                alt={e.clientName}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export default Clients;
