import React from "react";
import { LocationLists } from "../_actions/location";

function Location() {
  const Location = LocationLists[0].data;
  return (
    <>
      <section className="location">
        <div className="container mx-auto px-4">
          <div className="locationHeader">
            <h2 className="locationHead">Our Locations</h2>
            <p className="locationPara">
              With key operational hubs in Singapore, Malaysia, Indonesia,
              India, Sri Lanka, UAE, Canada and USA
            </p>
          </div>

          <div className="locationView flex flex-wrap justify-center gap-8">
            {Location.map((item) => (
              <div
                className="locationCard w-full sm:w-[48%] md:w-[30%]"
                key={item.id}
              >
                <p className="locationName">{item.Location}</p>
                <p className="locationCountry">{item.Country}</p>
                <p className="locationAddress">{item.Address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Location;
