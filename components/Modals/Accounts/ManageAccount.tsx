import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { BsPencil, BsX } from "react-icons/bs";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";

export default function ManageInspection({ isOpen, setter, isLoading, onSubmit }: any) {

  if (isOpen === false) {
    return <></>;
  }
  return (
    <div
      className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        className=" overflow-x-hidden overflow-y-auto fixed w-full h-full inset-0 z-50 outline-none focus:outline-none"
        // Stop propagation of click events from modal content to backdrop
      >
        <div className=" mx-auto w-full max-w-xl flex items-center justify-center min-h-screen ">
          {/*content*/}
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/*header*/}
            <div className="flex items-center justify-between px-4 py-2 border-b border-solid bg-[#F4F6FA] border-slate-200 rounded-t-[8px]">
              <h5 className="font-monts font-bold text-sm text-darkerGray">
                Manage Account
              </h5>
              <BsX
                className="flex w-4 h-4 object-contain cursor-pointer"
                onClick={() => setter(false)}
              />
            </div>
            {/*body*/}
            <div className="relative p-6 overflow-y-auto flex-col space-y-6">
              <div className="space-y-6 pt-6">
                <div className="w-full flex flex-col gap-2 ">
                  <h6 className="w-1/2 lg:w-[19%] font-monts font-bold text-sm text-darkerGray">
                    Name
                  </h6>
                  <input
                    type="text"
                    className="appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    title="name"
                  />
                </div>
                <div className="w-full flex flex-col gap-2 ">
                  <h6 className="w-1/2 lg:w-[19%] font-monts font-bold text-sm text-darkerGray">
                    Account type
                  </h6>
                  <div className="w-full relative">
                    <select
                      className="block cursor-pointer appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                      id="client"
                      aria-label="account-type"
                    >
                      {/* {clientList.map(({ client_id, name }) => (
                        <option key={client_id} value={name}>
                          {name}
                        </option>
                      ))} */}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 ">
                  <h6 className="w-1/2 lg:w-[19%] font-monts font-bold text-sm text-darkerGray">
                    Username
                  </h6>
                  <input
                    type="text"
                    className="appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    title="username"
                  />
                </div>
                <div className="w-full flex flex-col gap-2 ">
                  <h6 className="w-1/2 lg:w-[19%] font-monts font-bold text-sm text-darkerGray">
                    Password
                  </h6>
                  <input
                    type="password"
                    className="appearance-none w-full text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                    title="password"
                  />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end py-2 p-6 rounded-b">
              <button
                className="background-transparent outline-none focus:outline-none py-2 px-4 font-monts font-semibold text-sm text-[#C4C5C5]"
                type="button"
                onClick={() => setter(false)}
              >
                Cancel
              </button>
              <button
                className={`${
                  isLoading ? "flex items-center justify-center gap-0.5" : ""
                } py-2 px-4 font-monts font-semibold text-sm text-white bg-[#3C6497] rounded-lg outline-none w-fit`}
                type="button"
                onClick={onSubmit}
              >
                {isLoading ? (
                  <div className="flex">
                    <Spinner /> Updating account...
                  </div>
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