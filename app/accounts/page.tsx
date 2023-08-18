"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import { BsFunnel, BsX, BsPlusLg } from "react-icons/bs";
import AddNewAccount from "@/components/Modals/Accounts/AddNewAccount";
import ManageAccount from "@/components/Modals/Accounts/ManageAccount";
import DeleteAccount from "@/components/Modals/Accounts/DeleteAccount";
ChartJS.register(ArcElement);

export default function Accounts() {
  const [showAddNewAccountModal, setShowAddNewAccountModal] = useState(false);
  const [showManageAccountModal, setShowManageAccountModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      // null check added here
      if (showAddNewAccountModal || showManageAccountModal || showDeleteAccountModal) {
        body.style.overflow = "hidden"; // Disable scrolling
      } else {
        body.style.overflow = "auto"; // Enable scrolling
      }
    }
  }, []);

  const inspections: any[] = [
    {
      name: "Kobe Sergio",
      email: "ckasergio@gmail.com",
      password: "**************",
      accountType: "RO",
      lastLoggedIn: "5/21/2023",
    },
    {
      name: "Michelle Pantoja",
      email: "mmapantoja@gmail.com",
      password: "**************",
      accountType: "RO",
      lastLoggedIn: "5/21/2023",
    },
    {
      name: "Kobe Sergio",
      email: "ckasergio@gmail.com",
      password: "**************",
      accountType: "RO",
      lastLoggedIn: "5/21/2023",
    },
    {
      name: "Michelle Pantoja",
      email: "mmapantoja@gmail.com",
      password: "**************",
      accountType: "RO",
      lastLoggedIn: "5/21/2023",
    },
    {
      name: "Kobe Sergio",
      email: "ckasergio@gmail.com",
      password: "**************",
      accountType: "RO",
      lastLoggedIn: "5/21/2023",
    },
    {
      name: "Michelle Pantoja",
      email: "mmapantoja@gmail.com",
      password: "**************",
      accountType: "RO",
      lastLoggedIn: "5/21/2023",
    },
  ];

  const handleSubmitAddNewAccountModal = () => {
    setIsLoading(true);

    setTimeout(() => {
      setShowAddNewAccountModal(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmitManageAccountModal = () => {
    setIsLoading(true);

    setTimeout(() => {
      setShowManageAccountModal(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmitDeleteAccountModal = () => {
    setIsLoading(true);

    setTimeout(() => {
      setShowDeleteAccountModal(false);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <AddNewAccount
        isOpen={showAddNewAccountModal}
        setter={setShowAddNewAccountModal}
        isLoading={isLoading}
        onSubmit={handleSubmitAddNewAccountModal}
      />
      <ManageAccount
        isOpen={showManageAccountModal}
        setter={setShowManageAccountModal}
        isLoading={isLoading}
        onSubmit={handleSubmitManageAccountModal}
      />
      <DeleteAccount
        isOpen={showDeleteAccountModal}
        setter={setShowDeleteAccountModal}
        isLoading={isLoading}
        onSubmit={handleSubmitDeleteAccountModal}
      />
      <div className="min-h-[75vh] flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-1/4">
          <Sidebar />
        </aside>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between">
            <div className="w-full flex flex-row items-center gap-3">
              <div className="relative">
                <select
                  className="block cursor-pointer appearance-none w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                  id="year"
                  aria-label="year"
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
              <div className="relative flex items-center w-full lg:w-1/2">
                <RiSearchLine className="absolute left-3 fill-[#7C7C7C]" />
                <input
                  type="text"
                  id="worker-search"
                  className="pl-10 p-2.5 outline-none bg-white border border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-gray text-inherit flex w-full"
                  placeholder="Search for a client"
                />
              </div>
            </div>
            <div className="w-full max-lg:justify-center justify-end flex flex-col md:flex-row gap-3">
              <div className="relative">
                <select
                  className="block cursor-pointer appearance-none w-full lg:w-fit text-gray border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-[#7C7C7C] h-fit p-2.5 pr-6 outline-none"
                  id="account-type"
                  aria-label="account-type"
                >
                  <option value="account-type-all">Account Type: All</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
              <button
                type="button"
                className="w-full lg:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
                onClick={() => setShowAddNewAccountModal(true)}
              >
                <BsPlusLg className="flex w-4 h-4 object-contain" />
                Add new account
              </button>
            </div>
          </div>
          <div className="overflow-x-auto lg:overflow-x-hidden w-full h-full bg-white border border-[#D5D7D8] rounded-[10px]">
            <div className="min-w-[1068.8px] grid grid-cols-12 border-b border-[#BDBDBD] p-6">
              <h3 className="col-span-5 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4 pl-0">
                Account Credentials
              </h3>
              <h3 className="col-span-3 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Account Type
              </h3>
              <h3 className="col-span-2 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4">
                Last Logged In
              </h3>
              <h3 className="col-span-2 font-monts font-semibold text-sm text-start text-[#5C5C5C] px-4"></h3>
            </div>
            <div className="lg:overflow-y-auto w-full max-h-[28rem]">
              {inspections.length == 0 ? (
                <div className="min-h-full flex justify-center items-center p-44">
                  <h3 className="font-monts font-medium text-base text-center text-darkerGray">
                    There are no items to display.
                  </h3>
                </div>
              ) : (
                <>
                  {inspections.map((row, index) => (
                    <div
                      key={index}
                      className={`min-w-[1068.8px] grid grid-cols-12 p-6 items-center justify-center ${
                        index < inspections.length - 1
                          ? "border-b border-[#BDBDBD] "
                          : "border-none"
                      }  `}
                    >
                      <div className="col-span-5 flex flex-col gap-1 px-4 pl-0">
                        <h3 className="font-monts font-semibold text-sm text-darkerGray">
                          {row.name}
                        </h3>
                        <h3 className="font-monts font-normal text-xs text-darkerGray">
                          {row.email}
                        </h3>
                        <h3 className="font-monts font-normal text-xs text-darkerGray">
                          {row.password}
                        </h3>
                      </div>
                      <h3 className="col-span-3 font-monts font-semibold text-sm text-darkerGray px-4">
                        {row.accountType}
                      </h3>
                      <h3 className="col-span-2 font-monts font-semibold text-sm text-start text-darkerGray px-4">
                        {row.lastLoggedIn}
                      </h3>
                      <div className="col-span-2 flex justify-between font-monts font-semibold text-sm text-start text-darkerGray px-4">
                        <h3
                          onClick={() => setShowManageAccountModal(true)}
                          className="font-monts font-semibold text-sm text-primaryBlue cursor-pointer"
                        >
                          Manage
                        </h3>
                        <h3 onClick={() => setShowDeleteAccountModal(true)} className="font-monts font-semibold text-sm text-[#DB1131] cursor-pointer">
                          Delete
                        </h3>
                      </div>
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
