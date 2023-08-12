"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CancellationRequest from "@/components/Modals/CancellationRequest";
import EditInspection from "@/components/Modals/Dashboard/EditInspection";
import ReschedulingRequest from "@/components/ReschedulingRequest";
import InspectionCancellation from "@/components/Tasks/InspectionCancellation";
import InspectionRecommendation from "@/components/Tasks/InspectionRecommendation";
import UploadTravelOrder from "@/components/Tasks/UploadTravelOrder";
import { useState, useEffect } from "react";
import { BsPencil, BsX } from "react-icons/bs";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";

export default function Inspection() {
  const [showEditInspectionModal, setShowEditInspectionModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbItems = [
    {
      name: "Inspection Calendar",
      route: "/inspection-calendar",
    },
    {
      name: "Name",
    },
  ];

  const handleCloseEditInspection = () => {
    setShowEditInspectionModal(false);
  };
  const handleSubmitEditInspection = () => {
    //insert logic here
    setIsLoading(true);

    setTimeout(() => {
      setShowEditInspectionModal(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleCloseCancellationRequest = () => {
    setShowCancellationModal(false);
  };
  const handleSubmitCancellationRequest = () => {
    //insert logic here
    setIsLoading(true);

    setTimeout(() => {
      setShowCancellationModal(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleCloseReschedulingRequest = () => {
    setShowRescheduleModal(false);
  };
  const handleSubmitReschedulingRequest = () => {
    //insert logic here
    setIsLoading(true);

    setTimeout(() => {
      setShowRescheduleModal(false);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      // null check added here
      if (showEditInspectionModal) {
        body.style.overflow = "hidden"; // Disable scrolling
      } else {
        body.style.overflow = "auto"; // Enable scrolling
      }
    }
  }, [showEditInspectionModal]);

  return (
    <>
      <EditInspection
        isOpen={showEditInspectionModal}
        setter={handleCloseEditInspection}
        isLoading={isLoading}
        onSubmit={handleSubmitEditInspection}
      />
      <CancellationRequest
        isOpen={showCancellationModal}
        setter={handleCloseCancellationRequest}
        isLoading={isLoading}
        onSubmit={handleSubmitCancellationRequest}
      />
      <ReschedulingRequest
        isOpen={showRescheduleModal}
        setter={handleCloseReschedulingRequest}
        isLoading={isLoading}
        onSubmit={handleSubmitReschedulingRequest}
      />
      <div className="min-h-[75vh] w-full flex flex-col gap-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="w-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-monts font-bold text-lg text-darkerGray">
              Inspection Details
            </h1>
            <div
              className="flex flex-row gap-2 cursor-pointer items-center"
              onClick={() => setShowEditInspectionModal(true)}
            >
              <BsPencil className="fill-darkerGray" />
              <p className="font-monts text-sm font-semibold text-darkerGray">
                Edit
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Name
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                Mapua University - Makati
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Type
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                Higher Education
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Location
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                1191 Pablo Ocampo Sr. Ext, Makati, Metro Manila
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Email
              </h6>
              <p className="font-monts text-sm font-semibold text-primaryBlue hover:underline">
                registrar@mapua.edu.ph
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Mode
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                Physical
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Date Issued
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                5/20/2023
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Inspection Date
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                TBD
              </p>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <h6 className="font-monts text-sm font-semibold text-darkerGray">
              Travel/Office Order No.:{" "}
              <span className="text-primaryBlue">#92152613734734</span>
            </h6>
          </div>
        </div>
        {/* <div className="flex flex-row flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => setShowRescheduleModal(true)}
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          Request for rescheduling
        </button>
        <button
          type="button"
          onClick={() => setShowCancellationModal(true)}
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          Request for cancellation
        </button>
      </div> */}
        <UploadTravelOrder/>
      </div>
    </>
  );
}
