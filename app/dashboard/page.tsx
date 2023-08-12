"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import { BsFunnel, BsCalendar3, BsList, BsDownload } from "react-icons/bs";
import FilterModal from "@/components/Modals/Dashboard/FilterModal";
ChartJS.register(ArcElement);

export default function Dashboard() {
  const [showFilterModal, setShowFilterModal] = useState(false);
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

  useEffect(() => {
    const body = document.querySelector("body");
    if (showFilterModal) {
      body.style.overflow = "hidden"; // Disable scrolling
    } else {
      body.style.overflow = "auto"; // Enable scrolling
    }
  }, [showFilterModal]);

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
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      task: "Cancellation",
      fulfill_before: "7/6/23",
      route: "/dashboard/inspection",
    },
    {
      inspection_date: "9/1/2023",
      name: "Mapua University - Intramuros",
      type: "HEI",
      mode: "Physical",
      task: "Additional Approval",
      fulfill_before: "7/12/23",
      route: "/dashboard/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "University of Santo Tomas",
      type: "Establishment",
      mode: "Physical",
      task: "Travel Order",
      fulfill_before: "7/6/23",
      route: "/dashboard/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      task: "Certificate Issuance",
      fulfill_before: "N/A",
      route: "/dashboard/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      task: "Certificate Issuance",
      fulfill_before: "N/A",
      route: "/dashboard/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      task: "Certificate Issuance",
      fulfill_before: "N/A",
      route: "/dashboard/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      task: "Certificate Issuance",
      fulfill_before: "N/A",
      route: "/dashboard/inspection",
    },
    {
      inspection_date: "8/25/2023",
      name: "Makati Med",
      type: "Establishment",
      mode: "Physical",
      task: "Certificate Issuance",
      fulfill_before: "N/A",
      route: "/dashboard/inspection",
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
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between">
              <div className="w-full flex flex-row gap-3">
                <div className="relative">
                  <select
                    className="block cursor-pointer appearance-none w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    id="year2"
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
                    id="filter1"
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
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="w-full lg:w-1/2 bg-white border border-[#D5D7D8] flex flex-col lg:flex-row rounded-[10px] p-6 gap-5">
                <div className="w-full flex flex-col">
                  <h1 className="font-monts font-bold text-lg text-darkerGray">
                    PRB Tasks
                  </h1>
                  <h3 className="font-monts font-semibold text-base text-darkerGray">
                    2 total,{" "}
                    <span className="font-medium">proceed to resolve them</span>
                  </h3>
                  <div className="w-full flex flex-row justify-between gap-5 mt-5">
                    <div className="w-1/2 flex flex-col gap-3">
                      <h6 className="font-monts text-sm font-semibold text-darkerGray">
                        Pre-inspection tasks:
                      </h6>
                      <div className="flex flex-row justify-between font-monts text-sm">
                        <p className="font-medium text-darkerGray">
                          Cancellation
                        </p>
                        <p className="font-semibold text-darkerGray">1</p>
                      </div>
                      <div className="flex flex-row justify-between font-monts text-sm">
                        <p className="font-medium text-darkerGray">
                          Additional Approval
                        </p>
                        <p className="font-semibold text-darkerGray">1</p>
                      </div>
                      <div className="flex flex-row justify-between font-monts text-sm">
                        <p className="font-medium text-darkerGray">
                          Travel Order
                        </p>
                        <p className="font-semibold text-darkerGray">1</p>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-3">
                      <h6 className="font-monts text-sm font-semibold text-darkerGray">
                        Post-inspection tasks:
                      </h6>
                      <div className="flex flex-row justify-between font-monts text-sm">
                        <p className="font-medium text-darkerGray">
                          Certificate Issuance
                        </p>
                        <p className="font-semibold text-darkerGray">1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white border border-[#D5D7D8] flex flex-col lg:flex-row justify-between rounded-[10px] p-6 gap-5">
                <div className="w-full lg:w-3/5 flex flex-col">
                  <h1 className="font-monts font-bold text-lg text-darkerGray">
                    Overview
                  </h1>
                  <h3 className="font-monts font-medium text-base text-darkerGray">
                    Total number of task delivered
                  </h3>
                  <div className="space-y-3 mt-5">
                    {data.labels.map((label, index) => (
                      <div
                        key={label}
                        style={{
                          color: data.datasets[0].backgroundColor[index],
                        }}
                        className="font-monts text-sm flex justify-between font-semibold"
                      >
                        <h6>{label}</h6>
                        <p>{data.datasets[0].data[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-2/5 flex flex-col items-center">
                  <Pie data={data} options={options} width={10} height={10} />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3">
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
              <div className="relative flex items-center w-full lg:w-1/3">
                <RiSearchLine className="absolute left-3 fill-[#7C7C7C]" />
                <input
                  type="text"
                  id="worker-search"
                  className="pl-10 p-2.5 outline-none bg-white border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-gray text-inherit flex w-full"
                  placeholder="Search for a name"
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
            <div className="overflow-x-auto w-full h-full bg-white border border-[#D5D7D8] rounded-[10px]">
              <div className="min-w-[1068.8px] grid grid-cols-12 border-b border-[#BDBDBD] p-6">
                <h3 className="col-span-1 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4 pl-0">
                  Inspection Date
                </h3>
                <h3 className="col-span-4 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                  Name
                </h3>
                <h3 className="col-span-2 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Type
                </h3>
                <h3 className="col-span-1 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Mode
                </h3>
                <h3 className="col-span-2 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Task
                </h3>
                <h3 className="col-span-1 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                  Fulfill before
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
                        <h3 className=" col-span-4 font-monts font-semibold text-sm text-darkerGray px-4">
                          {row.name}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.type}
                        </h3>
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.mode}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.task}
                        </h3>
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.fulfill_before}
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
