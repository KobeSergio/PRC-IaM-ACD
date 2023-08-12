import Spinner from "@/components/Spinner";
import React from "react";

import { BsX } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";

export default function EditInspection({
  isOpen,
  setter,
  isLoading,
  onSubmit,
}: any) {
  const regOffices = [
    {
      name: "RO I",
    },
    {
      name: "RO II",
    },
    {
      name: "RO III",
    },
    {
      name: "RO IV-A",
    },
    {
      name: "RO IV-B",
    },
    {
      name: "RO V",
    },
    {
      name: "RO VI",
    },
    {
      name: "RO VII",
    },
    {
      name: "RO VIII",
    },
    {
      name: "RO IX",
    },
    {
      name: "RO X",
    },
    {
      name: "RO XI",
    },
    {
      name: "RO XII",
    },
    {
      name: "RO XIII",
    },
    {
      name: "RO NCR",
    },
    {
      name: "RO CAR",
    },
    {
      name: "RO BARMM",
    },
  ];
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
                Edit Inspection
              </h5>
              <BsX
                className="flex w-4 h-4 object-contain cursor-pointer"
                onClick={setter}
              />
            </div>
            {/*body*/}
            <div className="relative p-6 overflow-y-auto flex-col space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-1/2 flex gap-2 items-center">
                    <h6 className="w-1/2 font-monts font-bold text-sm text-darkerGray">
                      Inspection Year
                    </h6>
                    <div className="w-full relative">
                      <select
                        className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                        id="inspection_year"
                        aria-label="inspection_year"
                      >
                        <option value="">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 flex gap-2 items-center">
                    <h6 className="w-1/2 font-monts font-bold text-sm text-darkerGray">
                      Date/s of Inspection:
                    </h6>
                    <input
                      aria-label="date"
                      type="date"
                      className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-1/2 flex gap-2 items-center">
                    <h6 className="w-1/2 font-monts font-bold text-sm text-darkerGray">
                      Inspection Year
                    </h6>
                    <div className="w-full relative">
                      <select
                        className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                        id="MOI"
                        aria-label="MOI"
                      >
                        <option value="Virtual">Virtual</option>
                        <option value="Physical">Physical</option>
                        <option value="Blended">Blended</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 flex gap-2 items-center">
                    <h6 className="w-1/2 font-monts font-bold text-sm text-darkerGray">
                      Regional Office:
                    </h6>
                    <div className="w-full relative">
                      <select
                        className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                        id="RO"
                        aria-label="RO"
                      >
                        <option value="RO I">RO I</option>
                        <option value="RO II">RO II</option>
                        <option value="RO III">RO III</option>
                        <option value="RO IV-A">RO IV-A</option>
                        <option value="RO IV-B">RO IV-B</option>
                        <option value="RO VI">RO VI</option>
                        <option value="RO VII">RO VII</option>
                        <option value="RO VIII">RO VIII</option>
                        <option value="RO IX">RO IX</option>
                        <option value="RO X">RO X</option>
                        <option value="RO XI">RO XI</option>
                        <option value="RO XI">RO XI</option>
                        <option value="RO XII">RO XII</option>
                        <option value="RO NCR">RO NCR</option>
                        <option value="RO CAR">RO CAR</option>
                        <option value="RO BARMM">RO BARMM</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                      </div>
                    </div>{" "}
                  </div>
                </div>
                <div className="w-full flex gap-2 items-center">
                  <h6 className="w-1/2 lg:w-[19%] font-monts font-bold text-sm text-darkerGray">
                    HEI/Establishment to inspect:
                  </h6>
                  <div className="w-full relative">
                    <select
                      className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                      id="MOI"
                      aria-label="MOI"
                    >
                      <option value="New HEI/Institution">
                        New HEI/Institution
                      </option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-6 border-t border-solid border-slate-200">
                <h6 className="mt-6 font-monts font-bold text-sm text-darkerGray">
                  Register new client
                </h6>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex flex-col gap-2">
                    <h6 className="font-monts font-bold text-sm text-darkerGray">
                      Name
                    </h6>
                    <input
                      aria-label="date"
                      type="text"
                      className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    ></input>
                  </div>
                  <div className="w-full lg:w-1/4 flex flex-col gap-2">
                    <h6 className="font-monts font-bold text-sm text-darkerGray">
                      Type
                    </h6>
                    <div className="w-full relative">
                      <select
                        className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                        id="MOI"
                        aria-label="MOI"
                      >
                        <option value="Establishment">Establishment</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6 className="font-monts font-bold text-sm text-darkerGray">
                      Email
                    </h6>
                    <input
                      aria-label="email"
                      type="text"
                      className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    ></input>
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col gap-2">
                    <h6 className="font-monts font-bold text-sm text-darkerGray">
                      Address
                    </h6>
                    <input
                      aria-label="address"
                      type="text"
                      className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    ></input>
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
                    Updating inspection...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
