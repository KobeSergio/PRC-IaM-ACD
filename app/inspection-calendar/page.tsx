"use client";

import Sidebar from "@/components/Sidebar";
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

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useInspections } from "@/contexts/InspectionContext";
import { Inspection } from "@/types/Inspection";
import { useRouter } from "next/navigation";

export default function InspectionCalendar() {
  const { push } = useRouter();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const { inspections } = useInspections();

  //This is the list of inspections that will be displayed
  const [filteredInspections, setFilteredInspections] =
    useState<Inspection[]>(inspections);
  //Year sorter
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear as any); // Default to current year
  const [years, setYears] = useState([currentYear]);

  useEffect(() => {
    if (inspections.length > 0 && filteredInspections.length == 0)
      setFilteredInspections(
        inspections.filter(
          (inspection) =>
            new Date(inspection.inspection_date).getFullYear() ==
            parseInt(selectedYear)
        )
      );
  }, [inspections]);

  //Handler for year filter
  useEffect(() => {
    const filteredInspections = inspections.filter(
      (inspection) =>
        new Date(inspection.inspection_date).getFullYear() ==
        parseInt(selectedYear)
    );
    setFilteredInspections(filteredInspections);
  }, [selectedYear]);

  useEffect(() => {
    if (filteredInspections.length > 0) {
      const uniqueYears = new Set(
        inspections.map((inspection) =>
          new Date(inspection.inspection_date).getFullYear()
        )
      );
      const uniqueYearsArray = Array.from(uniqueYears);
      setYears([...uniqueYearsArray].sort().reverse());
    }
  }, [filteredInspections]);

  //Search filter
  const [search, setSearch] = useState("");
  //Handler for search filter
  useEffect(() => {
    if (inspections.length > 0) {
      if (search == "") {
        if (selectedYear == "All") {
          setFilteredInspections(inspections);
        } else {
          setFilteredInspections(
            inspections.filter(
              (inspection) =>
                new Date(inspection.inspection_date).getFullYear() ==
                parseInt(selectedYear)
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
        console.log(searchFilteredInspections);

        setFilteredInspections(searchFilteredInspections);
      }
    }
  }, [search]);

  const inspectionsWithTags = inspections.filter(
    (inspection) => inspection.status != "Pending"
  );

  const [preInspectionData, setPreInspectionData] = useState({
    labels: ["Rescheduled", "Cancelled", "Random", "Approved/Additional"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#6366F1", "#F59E0B", "#EC4899", "#14B8A6"],
        hoverBackgroundColor: ["#6366F1", "#F59E0B", "#EC4899", "#14B8A6"],
      },
    ],
  } as any);

  const [postInspectionData, setPostInspectionData] = useState({
    labels: ["Non-compliant", "For compliance", "Compliant"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#DB1131", "#FACC15", "#4F925A"],
        hoverBackgroundColor: ["#DB1131", "#FACC15", "#4F925A"],
      },
    ],
  } as any);

  useEffect(() => {
    if (inspections.length == 0) return;

    //Get number of inspections where inspection_status is reschedulled, cancelled, random, approved, additional, non-compliant, for compliance, compliant, and under review from inspections object
    const rescheduledInspections = inspections.filter(
      (inspection) => inspection.status == "Rescheduled"
    );
    const cancelledInspections = inspections.filter(
      (inspection) => inspection.status == "Cancelled"
    );
    const randomInspections = inspections.filter(
      (inspection) => inspection.status == "Random"
    );
    const approvedInspections = inspections.filter(
      (inspection) => inspection.status == "Approved"
    );
    const additionalInspections = inspections.filter(
      (inspection) => inspection.status == "Additional"
    );
    const nonCompliantInspections = inspections.filter(
      (inspection) => inspection.status == "Non-compliant"
    );
    const forComplianceInspections = inspections.filter(
      (inspection) => inspection.status == "For compliance"
    );
    const compliantInspections = inspections.filter(
      (inspection) => inspection.status == "Compliant"
    );
    const underReviewInspections = inspections.filter(
      (inspection) => inspection.status == "Under review"
    );

    setPreInspectionData({
      labels: ["Rescheduled", "Cancelled", "Random", "Approved/Additional"],
      datasets: [
        {
          data: [
            rescheduledInspections.length,
            cancelledInspections.length,
            randomInspections.length,
            approvedInspections.length + additionalInspections.length,
          ],
          backgroundColor: ["#6366F1", "#F59E0B", "#EC4899", "#14B8A6"],
          hoverBackgroundColor: ["#6366F1", "#F59E0B", "#EC4899", "#14B8A6"],
        },
      ],
    });

    setPostInspectionData({
      labels: ["Under Review", "Non-compliant", "For compliance", "Compliant"],
      datasets: [
        {
          data: [
            underReviewInspections.length,
            nonCompliantInspections.length,
            forComplianceInspections.length,
            compliantInspections.length,
          ],
          backgroundColor: ["#A6123B", "#DB1131", "#FACC15", "#4F925A"],
          hoverBackgroundColor: ["#DB1131", "#DB1131", "#FACC15", "#4F925A"],
        },
      ],
    });
  }, [inspections]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (showFilterModal) {
      if (body != null) body.style.overflow = "hidden"; // Disable scrolling
    } else {
      if (body != null) body.style.overflow = "auto"; // Enable scrolling
    }
  }, [showFilterModal]);

  //Calendar handler
  const handleEventClick = (arg: any) => {
    push("/inspection/" + arg.event.id);
  };

  const generateReport = async () => {
    if (filteredInspections.length == 0) {
      alert("No inspections to export");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("inspections", JSON.stringify(filteredInspections));
      formData.append("annex", "H");
      const response1 = await fetch("/api/reportExporter", {
        method: "POST",
        body: formData,
      });

      if (!response1.ok)
        throw new Error("Network response was not ok" + response1.statusText);

      const blob1 = await response1.blob();

      const link1 = document.createElement("a");
      link1.href = window.URL.createObjectURL(blob1);
      link1.download = "reportH.pdf";
      link1.click();

      const formData2 = new FormData();
      formData2.append("inspections", JSON.stringify(filteredInspections));
      formData2.append("annex", "J");
      const response2 = await fetch("/api/reportExporter", {
        method: "POST",
        body: formData2,
      });

      if (!response2.ok)
        throw new Error("Network response was not ok" + response2.statusText);

      const blob2 = await response2.blob();

      const link2 = document.createElement("a");
      link2.href = window.URL.createObjectURL(blob2);
      link2.download = "reportJ.pdf";
      link2.click();
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <>
      <FilterModal
        isOpen={showFilterModal}
        setter={() => setShowFilterModal(false)}
        isLoading={isLoading}
        inspections={inspections.filter(
          (inspection) =>
            new Date(inspection.inspection_date).getFullYear() ==
            parseInt(selectedYear)
        )}
        setFilteredInspections={setFilteredInspections}
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
                    id="year"
                    aria-label="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
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
                <div className="relative flex items-center w-full lg:w-1/2">
                  <RiSearchLine className="absolute left-3 fill-[#7C7C7C]" />
                  <input
                    type="text"
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
                  className="w-full lg:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-white border-primaryBlue rounded-lg font-monts font-semibold text-sm text-primaryBlue h-fit p-2.5"
                  onClick={() => setShowCalendar(false)}
                >
                  Show list
                  <BsList className="flex w-4 h-4 object-contain fill-primaryBlue" />
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                viewClassNames={["font-monts font-semibold text-sm"]}
                eventClassNames={["px-2 cursor-pointer "]}
                weekNumberClassNames={["font-monts font-semibold text-sm"]}
                initialView="dayGridMonth"
                eventClick={handleEventClick}
                selectable={true}
                events={filteredInspections.map((inspection: Inspection) => {
                  return {
                    title: inspection.client_details.name,
                    date: inspection.inspection_date,
                    id: inspection.inspection_id,
                    allDay: true,
                  };
                })}
              />
            </div>
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
                    {preInspectionData.labels.map((label: any, index: any) => (
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
              <div className="w-full lg:w-1/2 bg-white border border-[#D5D7D8] flex flex-col lg:flex-row items-center rounded-[10px] p-6 gap-5">
                <div className="w-full lg:w-3/5 flex flex-col">
                  <div className="space-y-3">
                    <p className="font-monts font-bold text-sm text-darkerGray">
                      Post-Inspection:
                    </p>
                    {postInspectionData.labels.map((label: any, index: any) => (
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
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between">
              <div className="w-full flex flex-row gap-3">
                <div className="relative">
                  <select
                    className="block cursor-pointer appearance-none w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    id="year"
                    aria-label="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
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
                <div className="relative flex items-center w-full lg:w-1/2">
                  <RiSearchLine className="absolute left-3 fill-[#7C7C7C]" />
                  <input
                    type="text"
                    id="worker-search"
                    className="pl-10 p-2.5 outline-none bg-white border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-gray text-inherit flex w-full"
                    placeholder="Search for a client"
                    value={search}
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
              <div className="w-full max-lg:justify-center justify-end flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  className="w-full lg:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-white border-primaryBlue rounded-lg font-monts font-semibold text-sm text-primaryBlue h-fit p-2.5"
                  onClick={() => generateReport()}
                >
                  Export Report
                  <BsDownload className="flex w-4 h-4 object-contain fill-primaryBlue" />
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

              <div className="lg:overflow-y-auto w-full max-h-[25rem] justify-center items-center flex flex-col">
                {filteredInspections.length == 0 ? (
                  <h3 className="font-monts font-medium text-base text-center text-darkerGray">
                    There are no items to display.
                  </h3>
                ) : (
                  <>
                    {filteredInspections.map((row, index) => (
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
                          {row.ro_details.office}
                        </h3>
                        <h3 className=" col-span-2 font-monts font-semibold text-sm text-center text-darkerGray px-4">
                          {row.status}
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
