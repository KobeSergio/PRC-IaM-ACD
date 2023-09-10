import React from "react";

export default function PendingWaiting({ task }: any) {
  let taskContent = "";

  if (task.toLowerCase().includes("scheduling")) {
    taskContent =
      "Inspection schedule is being settled for an inspection date by PRB and RO";
  }

  if (task.toLowerCase().includes("cancellation approval")) {
    taskContent = "Waiting for the cancellation request to be approved";
  }
  

  if (task.toLowerCase().includes("nim")) {
    taskContent = "Waiting for the NIM to be sent by PRB to the client";
  }

  if (task.toLowerCase().includes("inspection approval")) {
    taskContent = "Inspection is being reviewed by OC";
  }

  if (task.toLowerCase().includes("waiting requirements")) {
    taskContent = "Waiting for the requirements from the client";
  }

  return (
    <div className="h-fit lg:h-[45vh] bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-2">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Inspection Task
      </h1>
      <div className="flex flex-col gap-5 h-full justify-center items-center">
        <h6 className="font-monts font-semibold text-sm text-darkerGray">
          {taskContent}
        </h6>
      </div>
    </div>
  );
}
