"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CancellationRequest from "@/components/Modals/CancellationRequest";
import EditInspection from "@/components/Modals/Dashboard/EditInspection";
import InspectionCancellation from "@/components/Tasks/InspectionCancellation";
import InspectionRecommendation from "@/components/Tasks/InspectionRecommendation";
import UploadTravelOrder from "@/components/Tasks/UploadTravelOrder";
import PendingWaiting from "@/components/Tasks/PendingWaiting";
import ReschedulingRequest from "@/components/ReschedulingRequest";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BsPencil, BsX } from "react-icons/bs";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";
import Firebase from "@/lib/firebase";
import { Inspection } from "@/types/Inspection";
import { Client } from "@/types/Client";
const firebase = new Firebase();

export default function Page({ params }: { params: { id: string } }) {
  const [showEditInspectionModal, setShowEditInspectionModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [inspectionData, setInspectionData] = useState<Inspection>(
    {} as Inspection
  );

  useEffect(() => {
    if (params.id) {
      firebase
        .getInspection(params.id as string)
        .then((data) => {
          if (data == null) return;
          setInspectionData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.id]);

  const handleCloseEditInspection = () => {
    setShowEditInspectionModal(false);
  };

  const handleSubmitEditClient = async (new_client_details: Client) => {
    //insert logic here
    setIsLoading(true);

    await firebase.updateClient(new_client_details).then(() => {
      setInspectionData({
        ...inspectionData,
        client_details: new_client_details,
      });
    });

    setShowEditInspectionModal(false);
    setIsLoading(false);
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

  if (Object.keys(inspectionData).length == 0) return <></>;

  const breadcrumbItems = [
    {
      name: "Home",
      route: "/dashboard",
    },
    {
      name: inspectionData.client_details.name,
    },
  ];

  const task = inspectionData.inspection_task.toLowerCase();

  return (
    <>
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
                {inspectionData.client_details.name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Type
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.client_details.type}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Location
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.client_details.address}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Email
              </h6>
              <p className="font-monts text-sm font-semibold text-primaryBlue hover:underline">
                {inspectionData.client_details.email}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Mode
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.inspection_mode}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Date Issued
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.createdAt}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Inspection Date
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.inspection_task == "Scheduling"
                  ? "TBD"
                  : inspectionData.inspection_date}
              </p>
            </div>
          </div>
          {inspectionData.inspection_TO !== "" && (
            <div className="flex w-full justify-end">
              <h6 className="font-monts text-sm font-semibold text-darkerGray">
                Travel/Office Order No.:{" "}
                <span className="text-primaryBlue">#92152613734734</span>
              </h6>
            </div>
          )}
        </div>

        {/* If inspection data is scheduling and if a cancellation/rescheduling request is already ongoing, dont show the btns */}
        {task != "scheduling" &&
          task.includes("for") &&
          (task.includes("approval") ||
            inspectionData.inspection_task
              .toLowerCase()
              .includes("recommendation")) && (
            <div className="flex flex-row flex-wrap justify-end gap-2">
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
            </div>
          )}

        {task == "scheduling - PRB" ? (
          <></>
        ) : task == "imwpr" ? (
          <></>
        ) : task == "send nim" ? (
          <></>
        ) : task == "review inspection requirements" ? (
          //To follow interface where the client can upload the requirements
          <></>
        ) : (
          <PendingWaiting />
        )}
      </div>
    </>
  );
}
