import Spinner from "@/components/Spinner";
import React, { useState } from "react";

import { BsX } from "react-icons/bs";

export default function FilterModal({ isOpen, setter, isLoading, onSubmit }: any) {

  if (isOpen === false) {
    return <></>;
  }
  return (
    <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className=" overflow-x-hidden overflow-y-auto fixed w-full h-full inset-0 z-50 outline-none focus:outline-none">
        <div className=" mx-auto w-full max-w-2xl flex items-center justify-center min-h-screen ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between px-4 py-2 border-b border-solid bg-[#F4F6FA] border-slate-200 rounded-t-[8px]">
              <h5 className="font-monts font-bold text-sm text-darkerGray">
                Filter
              </h5>
              <BsX
                className="flex w-4 h-4 object-contain cursor-pointer"
                onClick={setter}
              />
            </div>
            {/*body*/}
            <div className="relative p-6 overflow-y-auto flex-col space-y-6">
              <div className="flex flex-col gap-3">
                <h6 className="font-monts text-sm font-semibold">Type</h6>
                <div className="flex flex-row">
                  <div className="w-1/2 lg:w-1/3 flex items-center">
                    <input
                      id="establishment"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="establishment"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Establishment
                    </label>
                  </div>
                  <div className="w-1/2 lg:w-1/3 flex items-center">
                    <input
                      id="HEI"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="HEI"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      HEI
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="font-monts text-sm font-semibold">Mode</h6>
                <div className="flex flex-row">
                  <div className="w-1/3 flex items-center">
                    <input
                      id="physical"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="physical"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Physical
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="blended"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="blended"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Blended
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="virtual"
                      type="checkbox"
                      value=""
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="virtual"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Virtual
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="font-monts text-sm font-semibold">Task</h6>
                <div className="flex flex-row">
                  <div className="w-1/2 lg:w-1/3 flex flex-col gap-2">
                    <h6 className="font-monts font-semibold text-xs">
                      PRE-INSPECTION
                    </h6>
                    <div className="w-full flex items-center">
                      <input
                        id="scheduling"
                        type="checkbox"
                        value=""
                        className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                      />
                      <label
                        htmlFor="scheduling"
                        className="ml-2 font-monts text-sm font-medium text-darkerGray"
                      >
                        Scheduling
                      </label>
                    </div>
                    <div className="w-full flex items-center">
                      <input
                        id="NIM"
                        type="checkbox"
                        value=""
                        className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                      />
                      <label
                        htmlFor="NIM"
                        className="ml-2 font-monts text-sm font-medium text-darkerGray"
                      >
                        NIM
                      </label>
                    </div>
                  </div>
                  <div className="w-1/2 lg:w-1/3 flex flex-col gap-2">
                    <h6 className="font-monts font-semibold text-xs">
                      POST-INSPECTION
                    </h6>
                    <div className="w-full flex items-center">
                      <input
                        id="IMWPR"
                        type="checkbox"
                        value=""
                        className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                      />
                      <label
                        htmlFor="IMWPR"
                        className="ml-2 font-monts text-sm font-medium text-darkerGray"
                      >
                        IMWPR
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end py-2 p-6 border-t border-solid border-slate-200 rounded-b">
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
                    Applying filters...
                  </>
                ) : (
                  "Apply filters"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
