"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CancellationRequest from "@/components/Modals/CancellationRequest";
import InspectionCancellation from "@/components/Tasks/InspectionCancellation";
import InspectionRecommendation from "@/components/Tasks/InspectionRecommendation";
import PendingWaiting from "@/components/Tasks/PendingWaiting";
import ReschedulingRequest from "@/components/ReschedulingRequest";
import { useState, useEffect } from "react";
import { BsPencil, BsX } from "react-icons/bs";
import Firebase from "@/lib/firebase";
import { Inspection } from "@/types/Inspection";
import { Client } from "@/types/Client";
import COCUpload from "@/components/Tasks/COCUpload";
import TOUpload from "@/components/Tasks/TOUpload";
import { Log } from "@/types/Log";
import { useSession } from "next-auth/react";
const firebase = new Firebase();

export default function Page({ params }: { params: { id: string } }) {
  const [showEditInspectionModal, setShowEditInspectionModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data }: any = useSession();

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

  const handleScheduleApproval = async (decision: number, remarks: string) => {
    if ((decision == 1 || decision == 0) && remarks == "")
      return alert("Please fill out all fields.");

    if (
      confirm(
        `Are you sure you want to ${
          decision == 0 ? "not recommend" : "recommend"
        } this inspection forward?`
      ) == undefined
    ) {
      console.log("first");
      return;
    }

    setIsLoading(true);

    let inspection: Inspection = {} as Inspection;
    let log: Log = {} as Log;

    if (decision == 0) {
      inspection = {
        ...inspectionData,
        inspection_task: "Inspection declined",
        status: "Cancelled",
      };

      log = {
        log_id: "",
        timestamp: new Date().toLocaleString(),
        client_details: inspectionData.client_details as Client,
        author_details: inspectionData.acd_details,
        action: "Cancelled inspection recommendation",
        author_type: "",
        author_id: "",
      };
    } else if (decision == 1) {
      //Send inspection to OC approval
      inspection = {
        ...inspectionData,
        inspection_task: "For inspection approval",
      };

      log = {
        log_id: "",
        timestamp: new Date().toLocaleString(),
        client_details: inspectionData.client_details as Client,
        author_details: inspectionData.acd_details,
        action: "Accomplished inspection recommendation",
        author_type: "",
        author_id: "",
      };
    }

    await firebase.createLog(log, data.acd_id);
    await firebase.updateInspection(inspection);
    setInspectionData(inspection);
    setIsLoading(false);
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

        {task.includes("inspection recommendation") ? (
          <InspectionRecommendation
            inspectionData={inspectionData}
            decision={handleScheduleApproval}
            isLoading={isLoading}
          />
        ) : task.includes("inspection cancellation") ? (
          <InspectionCancellation />
        ) : task.includes("coc") ? (
          <COCUpload />
        ) : task.includes("to") ? (
          <TOUpload />
        ) : (
          <PendingWaiting task={task} />
        )}
      </div>
    </>
  );
}
