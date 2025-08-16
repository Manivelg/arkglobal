import React from "react";
import { ContentList } from "../_actions/content";

function Training() {
  const Content = ContentList[0].data;
  return (
    <>
      <section className="training">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-6 md:col-span-4 sm:col-span-12">
              <div className="content_head">
                <p className="content_header">
                  End-to-End Marine & Offshore Support
                </p>
                <p className="content_para">
                  We deliver integrated marine and offshore services, including
                  pilotage, technical audits, lay-up management, and crew
                  training—ensuring safe, efficient, and fully compliant vessel
                  operations worldwide.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 md:col-span-8 sm:col-span-12">
              <div className="contentGrow grid grid-cols-1 gap-4">
                {Content.map((item) => (
                  <div
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
                    key={item.id}
                  >
                    <p className="text-xl font-semibold text-gray-800 mb-2">
                      {item.contentHeader}
                    </p>
                    <p className="text-gray-600 text-sm">{item.contentPara}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Training;
