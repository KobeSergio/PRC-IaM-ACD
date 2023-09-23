import { RiArrowDownSFill } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import Firebase from "@/lib/firebase";
import { Spinner } from "@/components/Spinner";
const firebase = new Firebase();

import { useState, useEffect } from "react";

import { IMAT } from "@/types/IMAT";
import { BsCloudArrowDown } from "react-icons/bs";

export default function IMATVS({
  IMATDetails,
  VSDetails,
}: {
  IMATDetails: IMAT;
  VSDetails: string;
}) {
  return (
    <div className="h-full w-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-6">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        INSPECTION AND MONITORING ADMINISTRATIVE TOOL (IMAT) & Verification
        Statement (VS)
      </h1>
      <form className="flex flex-col gap-4  ">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full lg:w-3/5 flex flex-col space-y-4">
            <h6 className="font-monts font-semibold text-sm text-darkerGray">
              Name of the Authorized Representative:
            </h6>
            <input
              type="text"
              value={IMATDetails.authorizedPersonnel}
              disabled
              className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
            />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col space-y-4">
            <h6 className="font-monts font-semibold text-sm text-darkerGray">
              Position:
            </h6>
            <input
              type="text"
              value={IMATDetails.position}
              disabled
              className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
            />
          </div>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts font-semibold text-base text-darkerGray">
            Registered and Licensed Professionals
          </h6>
          {IMATDetails.registeredProfessionals.map(
            (registeredProfessional, index) => {
              return (
                <>
                  <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        Name:
                      </h6>
                      <input
                        type="text"
                        disabled
                        value={registeredProfessional.name}
                        placeholder="John Doe"
                        className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                      />
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        License No:
                      </h6>
                      <input
                        type="text"
                        disabled
                        value={registeredProfessional.licenseNo}
                        placeholder="License No."
                        className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                      />
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        Date of Validity:
                      </h6>
                      <input
                        type="date"
                        disabled
                        value={registeredProfessional.dateOfValidity}
                        className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                      />
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        Cert. Displayed?
                      </h6>
                      <div className="w-full relative">
                        <select
                          disabled
                          value={registeredProfessional.certDisplayed}
                          className="block  appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                          id="certificate"
                          aria-label="certificate"
                        >
                          <option value="displayed">Displayed</option>
                          <option value="not displayed">Not Displayed</option>
                          <option value="not applicable">Not Applicable</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <RiArrowDownSFill className="flex w-4 h-4 object-contain " />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        CPD Compliant?
                      </h6>
                      <div className="w-full relative">
                        <select
                          disabled
                          value={registeredProfessional.cpdCompliant}
                          className="block  appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                          id="cpd"
                          aria-label="cpd"
                        >
                          <option value="compliant">Compliant</option>
                          <option value="non compliant">Non compliant</option>
                          <option value="not applicable">Not Applicable</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <RiArrowDownSFill className="flex w-4 h-4 object-contain " />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        AIPO/APO Member?
                      </h6>
                      <div className="w-full relative">
                        <select
                          disabled
                          value={registeredProfessional.aipoMember}
                          className="block  appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                          id="member"
                          aria-label="member"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="not applicable">Not Applicable</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <RiArrowDownSFill className="flex w-4 h-4 object-contain " />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        Other requirements:
                      </h6>
                      <input
                        type="text"
                        disabled
                        placeholder="Optional"
                        className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        Scope of Work:
                      </h6>
                      <input
                        disabled
                        type="text"
                        placeholder="Work"
                        className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                      />
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                      <h6 className="font-monts font-semibold text-sm text-darkerGray">
                        Workload:
                      </h6>
                      <input
                        type="text"
                        disabled
                        placeholder="Workload"
                        className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                      />
                    </div>
                  </div>
                </>
              );
            }
          )}
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts font-semibold text-base text-darkerGray">
            Employee/Staff
          </h6>
          {IMATDetails.employees.map((employee, index) => {
            return (
              <>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Name:
                    </h6>
                    <input
                      type="text"
                      value={employee.name}
                      disabled
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Qualifications/Credentials:
                    </h6>
                    <input
                      type="text"
                      value={employee.qualifications}
                      disabled
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Scope of work:
                    </h6>
                    <input
                      type="text"
                      value={employee.scopeOfWork}
                      disabled
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Workload:
                    </h6>
                    <input
                      type="text"
                      value={employee.workload}
                      disabled
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts flex gap-4 font-semibold text-base text-darkerGray">
            Verification Statement:{" "}
            <a
              href={VSDetails as string}
              className="text-primaryBlue font-monts font-normal flex items-center gap-2"
            >
              Download Verification Statement <BsCloudArrowDown />
            </a>
          </h6>
        </div>
      </form>
    </div>
  );
}
