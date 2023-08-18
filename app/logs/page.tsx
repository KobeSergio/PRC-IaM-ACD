"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import { BsFunnel, BsX } from "react-icons/bs";
import FilterModal from "@/components/Modals/Logs/FilterModal";
ChartJS.register(ArcElement);
export default function Logs() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };
  const handleSubmitFilterModal = () => {
    //insert logic here
    setIsLoading(true);

    setTimeout(() => {
      setShowFilterModal(false);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      // null check added here
      if (showFilterModal) {
        body.style.overflow = "hidden"; // Disable scrolling
      } else {
        body.style.overflow = "auto"; // Enable scrolling
      }
    }
  }, [showFilterModal]);


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
    <FilterModal
        isOpen={showFilterModal}
        setter={handleCloseFilterModal}
        isLoading={isLoading}
        onSubmit={handleSubmitFilterModal}
      />
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
                  onClick={() => setShowFilterModal(true)}
                >
                  <BsFunnel size={20} className="fill-[#7C7C7C]" />
                </button>
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

          <div className="overflow-x-auto lg:overflow-x-hidden w-full h-full bg-white border border-[#D5D7D8] rounded-[10px]">
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

            <div className="overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto w-full max-h-[28rem]">
              {inspections.length == 0 ? (
                <div className="min-h-full flex justify-center items-center p-48">
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
