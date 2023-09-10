import { Inspection } from "@/types/Inspection";
import React, { useState } from "react";
import { Spinner } from "../Spinner";

function formatDate(dateString: string) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the name of the day of the week
  const dayName = weekdays[date.getDay()];

  // Get the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so +1
  const day = String(date.getDate()).padStart(2, "0");

  // Return formatted date string
  return `${dayName}, ${year}/${month}/${day}`;
}

export default function InspectionRecommendation({
  inspectionData,
  decision,
  isLoading,
}: {
  inspectionData: Inspection;
  decision: any;
  isLoading: boolean;
}) {
  const [remarks, setRemarks] = useState("");

  return (
    <div className="h-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-5">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Inspection Task - Inspection Recommendation
      </h1>
      <div className="flex flex-col gap-2">
        <p className="font-monts text-sm text-darkerGray font-normal">
          The inspection date is at:{` `}
          <span className="font-bold">{inspectionData.inspection_date}</span>
        </p>
        <p className="font-monts text-sm text-darkerGray font-normal">
          Regional Office (RO):{` `}
          <span className="font-bold uppercase">
            {inspectionData.ro_details.office}
          </span>
        </p>
        <p className="font-monts text-sm text-darkerGray font-normal">
          Do you recommend the set time and date to the Oversight Commissioner?
        </p>
        <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
          <p className="font-monts text-sm text-darkerGray font-normal">
            Remarks:{" "}
          </p>
          <textarea
            rows={4}
            id="text"
            title="text"
            onChange={(e) => setRemarks(e.target.value)}
            value={remarks}
            className="text-[#7C7C7C] border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm block w-full p-2.5 outline-none"
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          onClick={() => decision(0, remarks)}
        >
          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>No, don&apos;t recommend</>
          )}
        </button>
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          onClick={() => decision(1, remarks)}
        >
          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>Yes, recommend the set time and date</>
          )}
        </button>
      </div>
    </div>
  );
}
