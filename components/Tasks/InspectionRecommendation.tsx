import React from "react";

export default function InspectionRecommendation() {
  return (
    <div className="h-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-5">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Inspection Task - Inspection Recommendation
      </h1>
      <div className="flex flex-col gap-2">
        <p className="font-monts text-sm text-darkerGray font-normal">
          The inspection date is at:{` `}
          <span className="font-bold">Friday, 6/23/2023</span>
        </p>
        <p className="font-monts text-sm text-darkerGray font-normal">
          Regional Office (RO):{` `}
          <span className="font-bold uppercase">RO NCR</span>
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
            className="text-[#7C7C7C] border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm block w-full p-2.5 outline-none"
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          No, don&apos;t recommend
        </button>
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          Yes, recommend the set time and date
        </button>
      </div>
    </div>
  );
}
