"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
ChartJS.register(ArcElement);
import { useLogs } from "@/contexts/LogContext";
import { Log } from "@/types/Log";

export default function Logs() {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const body = document.querySelector("body");
    if (showModal) {
      if (body) body.style.overflow = "hidden"; // Disable scrolling
    } else {
      if (body) body.style.overflow = "auto"; // Enable scrolling
    }
  }, [showModal]);

  const { logs } = useLogs();

  const [filteredLogs, setFilteredLogs] = useState<Log[]>(logs);

  //Author type sorter
  const [selectedAuthor, setSelectedAuthor] = useState("All"); // Default to all authors

  //Author type sorter handler
  useEffect(() => {
    if (selectedAuthor == "All") {
      setFilteredLogs(
        logs.filter(
          (log) =>
            new Date(log.timestamp).getFullYear() == parseInt(selectedYear)
        )
      );
    } else {
      const filteredLogs = logs.filter(
        (log) =>
          new Date(log.timestamp).getFullYear() == parseInt(selectedYear) &&
          log.author_type == selectedAuthor
      );
      setFilteredLogs(filteredLogs);
    }
  }, [selectedAuthor]);

  //Client sorter
  const [clients, setClients] = useState(["All"]);
  const [selectedClient, setSelectedClient] = useState("All"); // Default to all clients

  //Handler for client filter
  useEffect(() => {
    if (selectedClient == "All") {
      setFilteredLogs(
        logs.filter(
          (log) =>
            new Date(log.timestamp).getFullYear() == parseInt(selectedYear)
        )
      );
    } else {
      const filteredLogs = logs.filter(
        (log) =>
          new Date(log.timestamp).getFullYear() == parseInt(selectedYear) &&
          log.client_details.name == selectedClient
      );
      setFilteredLogs(filteredLogs);
    }
  }, [selectedClient]);

  //Year sorter
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear as any); // Default to current year
  const [years, setYears] = useState([currentYear]);

  //Handler for year filter
  useEffect(() => {
    //Filtered logs also
    const filteredLogs = logs.filter(
      (log) => new Date(log.timestamp).getFullYear() == parseInt(selectedYear)
    );
    setFilteredLogs(filteredLogs);
  }, [selectedYear]);

  useEffect(() => {
    if (filteredLogs.length > 0) {
      const uniqueYears = new Set(
        logs.map((log) => new Date(log.timestamp).getFullYear())
      );
      const uniqueYearsArray = Array.from(uniqueYears);
      setYears([...uniqueYearsArray].sort().reverse());

      //Get unique clients also
      const uniqueClients = new Set(logs.map((log) => log.client_details.name));
      const uniqueClientsArray = Array.from(uniqueClients);
      setClients([...uniqueClientsArray].sort());
    }
  }, [filteredLogs]);

  //Search filter
  const [search, setSearch] = useState("");

  //Handler for search filter
  useEffect(() => {
    if (logs.length > 0) {
      if (search == "") {
        setFilteredLogs(
          logs.filter(
            (log) =>
              new Date(log.timestamp).getFullYear() == parseInt(selectedYear)
          )
        );
      } else {
        const searchFilteredLogs = filteredLogs.filter((log) =>
          log.author_details.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredLogs(searchFilteredLogs);
      }
    }
  }, [search]);

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {/* <div className="">
                <button
                  type="button"
                  id="filter"
                  aria-label="filter"
                  className="p-2.5 outline-none bg-white border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-gray text-inherit flex w-full"
                  onClick={() => setShowModal(true)}
                >
                  <BsFunnel size={20} className="fill-[#7C7C7C]" />
                </button>
                {showModal && (
                  <FilterModal closeModal={() => setShowModal(false)} />
                )}
              </div> */}
            </div>
            <div className="max-lg:justify-center flex flex-col md:flex-row gap-3">
              <div className="w-full relative">
                <select
                  className="block cursor-pointer appearance-none w-full lg:w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                  id="client"
                  aria-label="client"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  {clients.map((client) => (
                    <option key={client} value={client}>
                      Client: {client}
                    </option>
                  ))}
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
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                >
                  <option value="All">Author: All</option>
                  <option value="prb">Author: PRB</option>
                  <option value="ro">Author: RO</option>
                  <option value="acd">Author: ACD</option>
                  <option value="oc">Author: OC</option>
                  <option value="client">Author: Client</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto w-full h-full bg-white border border-[#D5D7D8] rounded-[10px]">
            <div className="min-w-[1068.8px] grid grid-cols-12 border-b border-[#BDBDBD] p-6">
              <h3 className="col-span-3 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4 pl-0">
                Timestamp
              </h3>
              <h3 className="col-span-3 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Name
              </h3>
              <h3 className="col-span-2 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Author
              </h3>
              <h3 className="col-span-4 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Action
              </h3>
            </div>

            <div className="lg:overflow-y-auto w-full max-h-[25rem]">
              {filteredLogs.length == 0 ? (
                <div>
                  <h3 className="font-monts font-medium text-base text-center text-darkerGray">
                    There are no items to display.
                  </h3>
                </div>
              ) : (
                <>
                  {filteredLogs.map((row, index) => (
                    <div
                      key={index}
                      className={`min-w-[1068.8px] grid grid-cols-12 p-6 ${
                        index < filteredLogs.length - 1
                          ? "border-b border-[#BDBDBD] "
                          : "border-none"
                      }  `}
                    >
                      <h3 className=" col-span-3 font-monts font-semibold text-sm text-darkerGray px-4 pl-0">
                        {row.timestamp}
                      </h3>
                      <h3 className=" col-span-3 font-monts font-semibold text-sm text-darkerGray px-4">
                        {row.client_details.name}
                      </h3>
                      <h3 className=" col-span-2 font-monts font-semibold text-sm text-start text-darkerGray px-4">
                        {row.author_type.toUpperCase()}:{" "}
                        {row.author_details.hasOwnProperty("name")
                          ? row.author_details.name
                          : row.author_details.director}
                      </h3>
                      <h3 className=" col-span-4 font-monts font-semibold text-sm text-start text-darkerGray px-4">
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
