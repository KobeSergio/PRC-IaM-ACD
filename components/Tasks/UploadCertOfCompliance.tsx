import React from "react";

export default function InspectionCancellation() {
  return (
    <div className="h-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-5">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Upload Certificate of ompliance
      </h1>

      <label
        htmlFor="dropzone-file"
        className="w-full h-full flex flex-col justify-center items-center gap-2 px-14 py-16 border-2 border-dashed border-black/25 rounded-[10px] cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="font-monts font-semibold text-sm text-darkerGray">
            Click to upload certificate of compliance.
          </p>
          <p className="font-monts font-normal text-sm text-darkerGray">
            IMPORTANT: The file name should be in the following format{" "}
            {`<Inspection No.>`}_travel_order.pdf
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>

      <div className="flex flex-row flex-wrap justify-end">
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
