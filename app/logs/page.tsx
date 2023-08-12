"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import { BsFunnel, BsX } from "react-icons/bs";
ChartJS.register(ArcElement);
export default function Logs() {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (showModal) {
      body.style.overflow = "hidden"; // Disable scrolling
    } else {
      body.style.overflow = "auto"; // Enable scrolling
    }
  }, [showModal]);

  const data = {
    labels: ["Accomplished", "Missed", "Target"],
    datasets: [
      {
        data: [11, 1, 12],
        backgroundColor: ["#4F925A", "#973C3C", "#404040"],
        hoverBackgroundColor: ["#4F925A", "#973C3C", "#404040"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const inspections: any[] = [
    {
      timestamp: "6/20/2023 12:17AM",
      name: "Makati Med",
      author: "ACD",
      action: "Issued certificate of compliance",
    },
    {
      timestamp: "6/20/2023 12:17AM",
      name: "Makati Med",
      author: "PRB N&D",
      action: "Submitted IMWPR",
    },
    {
      timestamp: "6/20/2023 12:17AM",
      name: "Makati Med",
      author: "ACD",
      action: "Issued certificate of compliance",
    },
    {
      timestamp: "6/20/2023 12:17AM",
      name: "Makati Med",
      author: "ACD",
      action: "Issued certificate of compliance",
    },
    {
      timestamp: "6/20/2023 12:17AM",
      name: "Makati Med",
      author: "ACD",
      action: "Issued certificate of compliance",
    },
    {
      timestamp: "6/20/2023 12:17AM",
      name: "Makati Med",
      author: "ACD",
      action: "Issued certificate of compliance",
    },
    {
      timestamp: "6/20/2023 12:17AM",
      name: "Makati Med",
      author: "ACD",
      action: "Issued certificate of compliance",
    },
  ];

  return (
    <>
      <div className="min-h-[75vh] flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-1/4">
          <Sidebar />
        </aside>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between">
            <div className="w-full flex flex-row gap-3">
              <div className="relative">
                <select
                  className="block cursor-pointer appearance-none w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                  id="year"
                  aria-label="year"
                >
                  <option value="">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
              <div className="relative flex items-center w-full lg:w-1/2">
                <RiSearchLine className="absolute left-3 fill-[#7C7C7C]" />
                <input
                  type="text"
                  id="worker-search"
                  className="pl-10 p-2.5 outline-none bg-white border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-gray text-inherit flex w-full"
                  placeholder="Search for a client"
                />
              </div>
              <div className="">
                <button
                  type="button"
                  id="filter"
                  aria-label="filter"
                  className="p-2.5 outline-none bg-white border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-gray text-inherit flex w-full"
                  onClick={handleButtonClick}
                >
                  <BsFunnel size={20} className="fill-[#7C7C7C]" />
                </button>
                {showModal && (
                  <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className=" overflow-x-hidden overflow-y-auto fixed w-full h-full inset-0 z-50 outline-none focus:outline-none">
                      <div className=" mx-auto w-full max-w-2xl flex items-center justify-center min-h-screen ">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-center justify-between px-4 py-2 border-b border-solid bg-[#F4F6FA] border-slate-200 rounded-t-[8px]">
                            <h5 className="font-monts font-bold text-sm text-darkerGray">
                              Filter
                            </h5>
                            <BsX
                              className="flex w-4 h-4 object-contain cursor-pointer"
                              onClick={closeModal}
                            />
                          </div>
                          {/*body*/}
                          <div className="relative p-6 overflow-y-auto flex-col space-y-6">
                            <div className="flex flex-col gap-3">
                              <h6 className="font-monts text-sm font-semibold">
                                Type
                              </h6>
                              <div className="flex flex-row">
                                <div className="w-1/3 flex items-center">
                                  <input
                                    id="establishment"
                                    type="checkbox"
                                    value=""
                                    className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                  />
                                  <label
                                    htmlFor="establishment"
                                    className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                  >
                                    Establishment
                                  </label>
                                </div>
                                <div className="w-1/3 flex items-center">
                                  <input
                                    id="HEI"
                                    type="checkbox"
                                    value=""
                                    className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                  />
                                  <label
                                    htmlFor="HEI"
                                    className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                  >
                                    HEI
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3">
                              <h6 className="font-monts text-sm font-semibold">
                                Mode
                              </h6>
                              <div className="flex flex-row">
                                <div className="w-1/3 flex items-center">
                                  <input
                                    id="physical"
                                    type="checkbox"
                                    value=""
                                    className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                  />
                                  <label
                                    htmlFor="physical"
                                    className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                  >
                                    Physical
                                  </label>
                                </div>
                                <div className="w-1/3 flex items-center">
                                  <input
                                    id="blended"
                                    type="checkbox"
                                    value=""
                                    className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                  />
                                  <label
                                    htmlFor="blended"
                                    className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                  >
                                    Blended
                                  </label>
                                </div>
                                <div className="w-1/3 flex items-center">
                                  <input
                                    id="virtual"
                                    type="checkbox"
                                    value=""
                                    className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                  />
                                  <label
                                    htmlFor="virtual"
                                    className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                  >
                                    Virtual
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3">
                              <h6 className="font-monts text-sm font-semibold">
                                Task
                              </h6>
                              <div className="flex flex-row">
                                <div className="w-1/3 flex flex-col gap-2">
                                  <h6 className="font-monts font-semibold text-xs">
                                    PRE-INSPECTION
                                  </h6>
                                  <div className="w-full flex items-center">
                                    <input
                                      id="scheduling"
                                      type="checkbox"
                                      value=""
                                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                    />
                                    <label
                                      htmlFor="scheduling"
                                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                    >
                                      Scheduling
                                    </label>
                                  </div>
                                  <div className="w-full flex items-center">
                                    <input
                                      id="NIM"
                                      type="checkbox"
                                      value=""
                                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                    />
                                    <label
                                      htmlFor="NIM"
                                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                    >
                                      NIM
                                    </label>
                                  </div>
                                </div>
                                <div className="w-1/3 flex flex-col gap-2">
                                  <h6 className="font-monts font-semibold text-xs">
                                    POST-INSPECTION
                                  </h6>
                                  <div className="w-full flex items-center">
                                    <input
                                      id="IMWPR"
                                      type="checkbox"
                                      value=""
                                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                                    />
                                    <label
                                      htmlFor="IMWPR"
                                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                                    >
                                      IMWPR
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end py-2 p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="background-transparent outline-none focus:outline-none py-2 px-4 font-monts font-semibold text-sm text-[#C4C5C5]"
                              type="button"
                              onClick={closeModal}
                            >
                              Cancel
                            </button>
                            <button
                              className="py-2 px-4 font-monts font-semibold text-sm text-white bg-[#3C6497] rounded-lg outline-none "
                              type="button"
                              onClick={closeModal}
                            >
                              Apply filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="max-lg:justify-center flex flex-col md:flex-row gap-3">
              <div className="w-full relative">
                <select
                  className="block cursor-pointer appearance-none w-full lg:w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                  id="client"
                  aria-label="client"
                >
                  <option value="mapua">Client: Mapua University</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
              <div className="w-full relative">
                <select
                  className="block cursor-pointer appearance-none w-full lg:w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                  id="account-type"
                  aria-label="account-type"
                >
                  <option value="account-type-all">Account Type: All</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto w-full h-full bg-white border border-[#D5D7D8] rounded-[10px]">
            <div className="min-w-[1068.8px] grid grid-cols-12 border-b border-[#BDBDBD] p-6">
              <h3 className="col-span-2 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4 pl-0">
                Timestamp
              </h3>
              <h3 className="col-span-3 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Name
              </h3>
              <h3 className="col-span-2 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Author
              </h3>
              <h3 className="col-span-5 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Action
              </h3>
            </div>

            <div className="lg:overflow-y-auto w-full max-h-[25rem]">
              {inspections.length == 0 ? (
                <div>
                  <h3 className="font-monts font-medium text-base text-center text-darkerGray">
                    There are no items to display.
                  </h3>
                </div>
              ) : (
                <>
                  {inspections.map((row, index) => (
                    <div
                      key={index}
                      className={`min-w-[1068.8px] grid grid-cols-12 p-6 ${
                        index < inspections.length - 1
                          ? "border-b border-[#BDBDBD] "
                          : "border-none"
                      }  `}
                    >
                      <h3 className=" col-span-2 font-monts font-semibold text-sm text-darkerGray px-4 pl-0">
                        {row.timestamp}
                      </h3>
                      <h3 className=" col-span-3 font-monts font-semibold text-sm text-darkerGray px-4">
                        {row.name}
                      </h3>
                      <h3 className=" col-span-2 font-monts font-semibold text-sm text-start text-darkerGray px-4">
                        {row.author}
                      </h3>
                      <h3 className=" col-span-5 font-monts font-semibold text-sm text-start text-darkerGray px-4">
                        {row.action}
                      </h3>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
