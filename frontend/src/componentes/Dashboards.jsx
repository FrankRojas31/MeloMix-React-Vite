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

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                    </div>
                  </th>
                  <th scope="col" class="px-4 py-3 text-white">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-white">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 text-white">
                    Position
                  </th>
                  <th scope="col" class="px-6 py-3 text-white">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b hover:bg-[#eee]">
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                    <i class="nf nf-cod-trash text-[30px] text-[#999]"></i>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-black">
                    1
                  </td>
                  <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="/imagenes/logo.jpg" alt="Jese image"/>
                      <div class="pl-3">
                        <div class="text-base text-black font-semibold">Neil Sims</div>
                        <div class="font-normal text-black">neil.sims@flowbite.com</div>
                      </div>
                  </th>
                  <td class="px-6 py-4 text-black">
                    React Developer
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center text-black">
                      <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                    </div>
                  </td>
                  <td class="px-6 py-4 text-black">
                  <i class="nf nf-md-lead_pencil text-[30px] text-[#999]"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
