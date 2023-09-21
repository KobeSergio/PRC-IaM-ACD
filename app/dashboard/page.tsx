"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import { BsFunnel, BsX } from "react-icons/bs";
import FilterModal from "@/components/Modals/Dashboard/FilterModal";
import { useInspections } from "@/contexts/InspectionContext";
import { useLogs } from "@/contexts/LogContext";
import { PRB } from "@/types/PRB";
import { Log } from "@/types/Log";
import { Inspection } from "@/types/Inspection";
import { useSession } from "next-auth/react";
import { formatDateToYYYYMMDD } from "@/lib/formatDates";
ChartJS.register(ArcElement);

export default function Dashboard() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { inspections } = useInspections();
  const { logs } = useLogs();

  const { data }: any = useSession();

  const [filteredLogs, setFilteredLogs] = useState<Log[]>(logs);
  //Year sorter
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState("All" as any); // Default to current year
  const [years, setYears] = useState([currentYear]);
  const defaultInspections = inspections.filter(
    (inspection) =>
      inspection.inspection_task.includes("COC") ||
      inspection.inspection_task.includes("TO") ||
      inspection.inspection_task.includes("inspection recommendation") ||
      inspection.inspection_task.includes("cancellation recommendation") ||
      inspection.inspection_task.includes("rescheduling recommendation")
  );

  //This is the list of inspections that will be displayed
  const [filteredInspections, setFilteredInspections] =
    useState<Inspection[]>(defaultInspections);

  //Default filter
  useEffect(() => {
    if (defaultInspections.length > 0 && filteredInspections.length == 0)
      setFilteredInspections(defaultInspections);
  }, [defaultInspections, inspections]);

  //Handler for year filter
  useEffect(() => {
    if (selectedYear == "All") {
      setFilteredInspections(
        inspections.filter(
          (inspection) =>
            inspection.inspection_task.includes("COC") ||
            inspection.inspection_task.includes("TO") ||
            inspection.inspection_task.includes("inspection recommendation") ||
            inspection.inspection_task.includes("cancellation recommendation")
        )
      );
      setFilteredLogs(logs);
    } else {
      const filteredInspections = defaultInspections.filter(
        (inspection) =>
          new Date(inspection.inspection_date).getFullYear() ==
          parseInt(selectedYear)
      );
      setFilteredInspections(filteredInspections);

      //Filtered logs also
      const filteredLogs = logs.filter(
        (log) =>
          new Date(log.timestamp).getFullYear() == parseInt(selectedYear) &&
          log.author_id == data.acd_id
      );
      setFilteredLogs(filteredLogs);
    }
  }, [selectedYear]);

  //Get number of inspections where inspection_task is for the ACD
  const [cancellation, setCancellation] = useState(0);
  const [inspectionRecommendation, setAdditionalApproval] = useState(0);
  const [travelOrder, setTravelOrder] = useState(0);
  const [cocIssuance, setCocIssuance] = useState(0);

  useEffect(() => {
    if (filteredInspections.length > 0) {
      const inspectionsByDate = defaultInspections.filter(
        (inspection) =>
          new Date(inspection.inspection_date).getFullYear() ==
          parseInt(selectedYear)
      );

      const _cancellation = inspectionsByDate.filter((inspection) =>
        inspection.inspection_task.includes("Cancellation Recommnedation")
      ).length;
      const _inspectionRecommendation = inspectionsByDate.filter((inspection) =>
        inspection.inspection_task.includes("inspection recommendation")
      ).length;
      const _travelOrder = inspectionsByDate.filter((inspection) =>
        inspection.inspection_task.includes("TO")
      ).length;
      const _cocIssuance = inspectionsByDate.filter((inspection) =>
        inspection.inspection_task.includes("COC")
      ).length;

      setCancellation(_cancellation);
      setAdditionalApproval(_inspectionRecommendation);
      setTravelOrder(_travelOrder);
      setCocIssuance(_cocIssuance);

      const uniqueYears = new Set(
        defaultInspections.map((inspection) =>
          new Date(inspection.inspection_date).getFullYear()
        )
      );
      const uniqueYearsArray = Array.from(uniqueYears);
      setYears([...uniqueYearsArray].sort().reverse());
    }
  }, [filteredInspections]);

  //Get number of logs where author_id is the current user
  const [pieData, setPieData] = useState({
    labels: ["Accomplished", "Missed"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#4F925A", "#973C3C"],
        hoverBackgroundColor: ["#4F925A", "#973C3C"],
      },
    ],
  } as any);

  useEffect(() => {
    if (logs.length != 0 && data != null) {
      const _logs = logs.filter((log) => log.author_type == "acd");

      const accomplished = _logs.filter(
        (log) =>
          log.action.includes("Accomplished") ||
          log.action.includes("Cancelled")
      ).length;
      const missed = _logs.filter((log) =>
        log.action.includes("Missed")
      ).length;

      const pieData = {
        labels: ["Accomplished", "Missed"],
        datasets: [
          {
            data: [accomplished, missed],
            backgroundColor: ["#4F925A", "#973C3C"],
            hoverBackgroundColor: ["#4F925A", "#973C3C"],
          },
        ],
      };
      setPieData(pieData);
    }
  }, [logs]);

  //Search filter
  const [search, setSearch] = useState("");
  //Handler for search filter
  useEffect(() => {
    if (defaultInspections.length > 0) {
      if (search == "") {
        if (selectedYear == "All") {
          setFilteredInspections(defaultInspections);
        } else {
          setFilteredInspections(
            inspections.filter(
              (inspection) =>
                new Date(inspection.inspection_date).getFullYear() ==
                  parseInt(selectedYear) &&
                (inspection.inspection_task.includes("COC") ||
                  inspection.inspection_task.includes("TO") ||
                  inspection.inspection_task.includes(
                    "inspection recommendation"
                  ) ||
                  inspection.inspection_task.includes(
                    "cancellation recommendation"
                  ))
            )
          );
        }
      } else {
        const searchFilteredInspections = filteredInspections.filter(
          (inspection) =>
            inspection.client_details.name
              .toLowerCase()
              .includes(search.toLowerCase())
        );
        setFilteredInspections(searchFilteredInspections);
      }
    }
  }, [search]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (showFilterModal) {
      if (body) body.style.overflow = "hidden"; // Disable scrolling
    } else {
      if (body) body.style.overflow = "auto"; // Enable scrolling
    }
  }, [showFilterModal]);

  return (
    <>
      <FilterModal
        isOpen={showFilterModal}
        setter={() => setShowFilterModal(false)}
        isLoading={isLoading}
        inspections={filteredInspections}
        setFilteredInspections={setFilteredInspections}
      />
      <div className="min-h-[75vh] flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-1/4">
          <Sidebar />
        </aside>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-1/2 bg-white border border-[#D5D7D8] flex flex-col lg:flex-row rounded-[10px] p-6 gap-5">
              <div className="w-full flex flex-col">
                <h1 className="font-monts font-bold text-lg text-darkerGray">
                  ACD Tasks
                </h1>
                <h3 className="font-monts font-semibold text-base text-darkerGray">
                  {cancellation +
                    inspectionRecommendation +
                    travelOrder +
                    cocIssuance}{" "}
                  total,{" "}
                  <span className="font-medium">proceed to resolve them</span>
                </h3>
                <div className="w-full flex flex-row justify-between gap-5 mt-5">
                  <div className="w-1/2 flex flex-col gap-3">
                    <h6 className="font-monts text-sm font-semibold">
                      Pre-inspection tasks:
                    </h6>
                    <div className="flex flex-row justify-between font-monts text-sm">
                      <p className="font-medium">Cancellation Recommendation</p>
                      <p className="font-semibold">{cancellation}</p>
                    </div>
                    <div className="flex flex-row justify-between font-monts text-sm">
                      <p className="font-medium">Inspection Recommendation</p>
                      <p className="font-semibold">
                        {inspectionRecommendation}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between font-monts text-sm">
                      <p className="font-medium">Travel Order (TO)</p>
                      <p className="font-semibold">{travelOrder}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col gap-3">
                    <h6 className="font-monts text-sm font-semibold">
                      Post-inspection tasks:
                    </h6>
                    <div className="flex flex-row justify-between font-monts text-sm">
                      <p className="font-medium">
                        Certificate of Compliance (COC)
                      </p>
                      <p className="font-semibold">{cocIssuance}</p>
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
                  {pieData.labels.map((label: any, index: any) => (
                    <div
                      key={label}
                      style={{
                        color: pieData.datasets[0].backgroundColor[index],
                      }}
                      className="font-monts text-sm flex justify-between font-semibold"
                    >
                      <h6>{label}</h6>
                      <p>{pieData.datasets[0].data[index]}</p>
                    </div>
                  ))}
                  <div className="font-monts text-sm flex justify-between font-semibold">
                    <h6>Target</h6>
                    <p>
                      {
                        //Get total number of tasks
                        pieData.datasets[0].data.reduce(
                          (a: any, b: any) => a + b,
                          0
                        )
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-2/5 flex flex-col items-center">
                <Pie
                  data={pieData}
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                  }}
                  width={10}
                  height={10}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="relative">
              <select
                className="block cursor-pointer appearance-none w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                id="year"
                aria-label="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value={"All"}>All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
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
                placeholder="Search for an establishment/HEI.."
                onChange={(e) => setSearch(e.target.value)}
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
          <div className="overflow-x-auto w-full h-full bg-white border border-[#D5D7D8] rounded-[10px]">
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
                Task
              </h3>
              <h3 className="col-span-2 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4">
                Fulfill before
              </h3>
              <h3 className="col-span-1 font-monts font-semibold text-sm text-center text-[#5C5C5C] px-4 pr-0"></h3>
            </div>

            <div className="lg:overflow-y-auto w-full h-[55%]">
              {filteredInspections.length == 0 ? (
                <div className="flex justify-center items-center h-full">
                  <h3 className="font-monts font-medium text-base text-center text-darkerGray">
                    There are no items to display.
                  </h3>
                </div>
              ) : (
                <>
                  {filteredInspections.map((row, index) => {
                    const fulfillBefore = row.inspection_task.includes("<")
                      ? //If there is <> in the task and if there is a / split it and get the last index which is the date. If there is no /, just get the date inside the <>
                        row.inspection_task.split("<")[1].split("/").length > 1
                        ? row.inspection_task
                            .split("<")[1]
                            .split("/")
                            .slice(-1)[0]
                            .split(",")[0]
                        : row.inspection_task.split("<")[1]
                      : //If there is no <> it means that the schedule is initial, get the createdAt date and add 3 days to it and format the date to
                        formatDateToYYYYMMDD(
                          new Date(
                            new Date(row.createdAt).getTime() +
                              3 * 24 * 60 * 60 * 1000
                          )
                        );
                    return (
                      <div
                        key={index}
                        className={`min-w-[1068.8px] grid grid-cols-12 p-6 ${
                          index < filteredInspections.length - 1
                            ? "border-b border-[#BDBDBD] "
                            : "border-none"
                        }  `}
                      >
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-darkerGray px-4 pl-0">
                          {row.inspection_date}
                        </h3>
                        <h3 className=" col-span-3 font-monts font-semibold text-sm text-darkerGray px-4">
                          {row.client_details.name}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.client_details.type}
                        </h3>
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.inspection_mode}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {
                            row.inspection_task.replace(/<[^>]+>/g, "").trim() //Removes <>
                          }
                        </h3>
                        <h3 className="flex justify-center  col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {fulfillBefore.replace(/>/g, "").trim()}
                          {
                            //If fulfillBefore's day is less than 2 days from now, show the red notification if not, show orange.
                            new Date(
                              fulfillBefore.replace(/>/g, "").trim()
                            ).getTime() -
                              new Date().getTime() <
                            2 * 24 * 60 * 60 * 1000 ? (
                              <div className="ml-2 bg-red-500 text-white w-[1rem] h-[1rem] rounded-full flex items-center justify-center">
                                !
                              </div>
                            ) : (
                              <div className="ml-2 bg-orange-500 text-white w-[1rem] h-[1rem] rounded-full flex items-center justify-center">
                                !
                              </div>
                            )
                          }
                        </h3>
                        <h3 className=" col-span-1 font-monts font-semibold text-sm text-center text-darkerGray px-4 pr-0">
                          <Link
                            href={"inspection/" + row.inspection_id}
                            className="font-monts font-semibold text-sm text-primaryBlue p-3 pl-0 hover:underline"
                          >
                            View
                          </Link>
                        </h3>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
