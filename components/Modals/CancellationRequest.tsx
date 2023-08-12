import Spinner from "@/components/Spinner";
import React, { useState } from "react";

import { BsX } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";

export default function CancellationRequest({
  isOpen,
  setter,
  isLoading,
  onSubmit,
}: any) {

  if (isOpen === false) {
    return <></>;
  }
  return (
    <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className=" overflow-x-hidden overflow-y-auto fixed w-full h-full inset-0 z-50 outline-none focus:outline-none">
        <div className=" mx-auto w-full max-w-4xl flex items-center justify-center min-h-screen ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between px-4 py-2 border-b border-solid bg-[#F4F6FA] border-slate-200 rounded-t-[8px]">
              <h5 className="font-monts font-bold text-sm text-darkerGray">
                Cancellation Request
              </h5>
              <BsX
                className="flex w-4 h-4 object-contain cursor-pointer"
                onClick={setter}
              />
            </div>
            {/*body*/}
            <div className="relative p-6 overflow-y-auto flex-col space-y-6">
              <div className="flex flex-col gap-2">
                <h4 className="font-monts font-bold text-base text-darkerGray">
                  Are you sure you want to cancel inspection?
                </h4>
                <p className="font-monts font-medium text-sm text-darkerGray">
                  Upon submitting your request, it will undergo screening
                  through ACD and the Oversight Commissioner first. Please check
                  the requirements for requesting a inspection cancellation
                </p>
              </div>
              <div className="space-y-6 pt-6 border-t border-solid border-slate-200">
                <div className="flex flex-col gap-6">
                  <div className="w-full flex gap-2 items-center">
                    <h6 className="w-1/5 font-monts font-bold text-sm text-darkerGray">
                      Reason:
                    </h6>
                    <div className="w-full relative">
                      <select
                        className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                        id="reason"
                        aria-label="reason"
                      >
                        <option value="others">Others</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <h6 className="w-1/5 font-monts font-bold text-sm text-darkerGray">
                      Remarks:
                    </h6>
                    <textarea
                      title="remarks"
                      rows={4}
                      className="text-[#7C7C7C] border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block w-full p-2.5 outline-none"
                      />
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end py-2 p-6 rounded-b">
              <button
                className="background-transparent outline-none focus:outline-none py-2 px-4 font-monts font-semibold text-sm text-[#C4C5C5]"
                type="button"
                onClick={setter}
              >
                Cancel
              </button>
              <button
                className={`${
                  isLoading ? "flex items-center gap-0.5" : ""
                } py-2 px-4 font-monts font-semibold text-sm text-white bg-[#3C6497] rounded-lg outline-none`}
                type="button"
                onClick={onSubmit}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Submitting request...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
