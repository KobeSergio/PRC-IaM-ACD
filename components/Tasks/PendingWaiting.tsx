import React from "react";

export default function PendingWaiting() {
  return (
    <div className="h-fit lg:h-[45vh] bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-2">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Inspection Task
      </h1>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h6 className="font-monts font-semibold text-sm text-darkerGray">
          Fulfill your IWMPR and NIM on the given inspection date.
        </h6>
        <h6 className="font-monts font-semibold text-sm text-darkerGray">Or</h6>
        <h6 className="font-monts font-semibold text-sm text-darkerGray">
          Nothing to do here now, the inspection request is still pending.
        </h6>
        <h6 className="font-monts font-semibold text-sm text-darkerGray">Or</h6>
        <h6 className="font-monts font-semibold text-sm text-darkerGray">
          Waiting approval from the client.
        </h6>
      </div>
    </div>
  );
}
