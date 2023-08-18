"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import {
  BsFunnel,
  BsCalendar3,
  BsPlusLg,
  BsList,
  BsDownload,
} from "react-icons/bs";
import FilterModal from "@/components/Modals/InspectionCalendar/FilterModal";
ChartJS.register(ArcElement);

export default function InspectionCalendar() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddInspectionModal, setShowAddInspectionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

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

  const handleCloseAddInspectionModal = () => {
    setShowAddInspectionModal(false);
  };
  const handleSubmitAddInspectionModal = () => {
    //insert logic here
    setIsLoading(true);

    setTimeout(() => {
      setShowAddInspectionModal(false);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      // null check added here
      if (showFilterModal || showAddInspectionModal) {
        body.style.overflow = "hidden"; // Disable scrolling
      } else {
        body.style.overflow = "auto"; // Enable scrolling
      }
    }
  }, [showFilterModal, showAddInspectionModal]);

  const preInspectionData = {
    labels: ["Rescheduled", "Cancelled", "Random", "Approved/Additional"],
    datasets: [
      {
        data: [11, 1, 12, 20],
        backgroundColor: ["#6366F1", "#F59E0B", "#EC4899", "#14B8A6"],
        hoverBackgroundColor: ["#6366F1", "#F59E0B", "#EC4899", "#14B8A6"],
      },
    ],
  };

  const postInspectionData = {
    labels: ["Non-compliant", "For compliance", "Compliant"],
    datasets: [
      {
        data: [17, 24, 20],
        backgroundColor: ["#DB1131", "#FACC15", "#4F925A"],
        hoverBackgroundColor: ["#DB1131", "#FACC15", "#4F925A"],
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
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PI: Random",
      route: "/inspection-calendar/inspection",
    },
    {
      inspection_date: "9/1/2023",
      name: "Mapua University - Intramuros",
      type: "HEI",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PI: Approved",
      route: "/inspection-calendar/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "University of Santo Tomas",
      type: "Establishment",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PO: Compliant",
      route: "/inspection-calendar/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PO: Compliant",
      route: "/inspection-calendar/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PO: Compliant",
      route: "/inspection-calendar/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PO: Compliant",
      route: "/inspection-calendar/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PO: Compliant",
      route: "/inspection-calendar/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      regional_office: "RO NCR",
      status: "PO: Compliant",
      route: "/inspection-calendar/inspection",
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
        {showCalendar ? (
          // Calendar Section
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between">
              <div className="w-full flex flex-row gap-3">
                <div className="relative">
                  <select
                    className="block cursor-pointer appearance-none w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    id="year3"
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
                    id="search"
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
              <div className="w-full max-lg:justify-center justify-end flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  className="w-full lg:w-fit flex flex-row justify-center items-center text-darkerGray gap-2 font-monts font-semibold text-sm p-2.5"
                >
                  Generate Report <BsDownload />
                </button>
                <button
                  type="button"
                  className="w-full lg:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-white border-primaryBlue rounded-lg font-monts font-semibold text-sm text-primaryBlue h-fit p-2.5"
                  onClick={() => setShowCalendar(false)}
                >
                  Show list
                  <BsList className="flex w-4 h-4 object-contain fill-primaryBlue" />
                </button>
              </div>
            </div>
            <div>insert calendar here</div>
          </div>
        ) : (
          // List Section
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="w-full lg:w-1/2 bg-white border border-[#D5D7D8] flex flex-col lg:flex-row items-center rounded-[10px] p-6 gap-5">
                <div className="w-full lg:w-3/5 flex flex-col">
                  <div className="space-y-3">
                    <p className="font-monts font-bold text-sm text-darkerGray">
                      Pre-Inspection:
                    </p>
                    {preInspectionData.labels.map((label, index) => (
                      <div
                        key={label}
                        style={{
                          color:
                            preInspectionData.datasets[0].backgroundColor[
                              index
                            ],
                        }}
                        className="font-monts text-sm flex justify-between font-semibold"
                      >
                        <h6>{label}</h6>
                        <p>{preInspectionData.datasets[0].data[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-2/5 flex flex-col items-center">
                  <Pie
                    data={preInspectionData}
                    options={options}
                    width={10}
                    height={10}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white border border-[#D5D7D8] flex flex-col lg:flex-row items-center rounded-[10px] p-6 gap-5">
                <div className="w-full lg:w-3/5 flex flex-col">
                  <div className="space-y-3">
                    <p className="font-monts font-bold text-sm text-darkerGray">
                      Post-Inspection:
                    </p>
                    {postInspectionData.labels.map((label, index) => (
                      <div
                        key={label}
                        style={{
                          color:
                            postInspectionData.datasets[0].backgroundColor[
                              index
                            ],
                        }}
                        className="font-monts text-sm flex justify-between font-semibold"
                      >
                        <h6>{label}</h6>
                        <p>{postInspectionData.datasets[0].data[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-2/5 flex flex-col items-center">
                  <Pie
                    data={postInspectionData}
                    options={options}
                    width={10}
                    height={10}
                  />
                </div>
              </div>
            </div>
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
              <div className="w-full max-lg:justify-center justify-end flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  className="w-full lg:w-fit flex flex-row justify-center items-center text-darkerGray gap-2 font-monts font-semibold text-sm p-2.5"
                >
                  Generate Report <BsDownload />
                </button>
                <button
                  type="button"
                  className="w-full lg:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-white border-primaryBlue rounded-lg font-monts font-semibold text-sm text-primaryBlue h-fit p-2.5"
                  onClick={() => setShowCalendar(true)}
                >
                  Show calendar
                  <BsCalendar3 className="flex w-4 h-4 object-contain fill-primaryBlue" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto lg:overflow-x-hidden w-full h-full bg-white border border-[#D5D7D8] rounded-[10px]">
              <div className="min-w-[1068.8px] grid grid-cols-12 border-b border-[#BDBDBD] p-6">
                <h3 className="col-span-1 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4 pl-0">
                  Inspection Date
                </h3>
                <h3 className="col-span-3 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                  Name
                </h3>
                <h3 className="col-span-2 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Type
                </h3>
                <h3 className="col-span-1 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Mode
                </h3>
                <h3 className="col-span-2 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Regional Office
                </h3>
                <h3 className="col-span-2 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Status
                </h3>
                <h3 className="col-span-1 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4 pr-0">
                  {""}
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
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-darkerGray px-4 pl-0">
                          {row.inspection_date}
                        </h3>
                        <h3 className=" col-span-3 font-monts font-semibold text-sm text-darkerGray px-4">
                          {row.name}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.type}
                        </h3>
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.mode}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.regional_office}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.status}
                        </h3>
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-center text-darkerGray px-4 pr-0">
                          <Link
                            href={row.route}
                            className="font-monts font-semibold text-sm text-primaryBlue p-3 pl-0 hover:underline"
                          >
                            View
                          </Link>
                        </h3>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
