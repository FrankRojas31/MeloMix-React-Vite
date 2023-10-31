import React, { useEffect, useState } from "react";

export default function Dashboards() {
  return (
    <>
      <div className="w-full overflow-x-hidden flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Dashboard</h1>

          <div className="flex flex-wrap mt-6">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
              <p className="text-xl pb-3 flex items-center">
                <i className="nf nf-fa-plus mr-3"></i> Monthly Reports
              </p>
              <div className="p-6 bg-white">
                <canvas id="chartOne" width="400" height="200"></canvas>
              </div>
            </div>
            <div classNameName="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
              <p className="text-xl pb-3 flex items-center">
                <i className="nf nf-fa-check mr-3"></i> Resolved Reports
              </p>
              <div className="p-6 bg-white">
                <canvas id="chartTwo" width="400" height="200"></canvas>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
