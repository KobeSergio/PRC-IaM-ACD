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
import { extractFilenameFromFirebaseURL } from "@/lib/filenameExtractor";
import { formatDateToDash } from "@/lib/formatDates";
const firebase = new Firebase();

export default function Page({ params }: { params: { id: string } }) {
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

  const handleScheduleApproval = async (decision: number, remarks: string) => {
    if ((decision == 1 || decision == 0) && remarks == "")
      return alert("Please fill out all fields.");

    if (
      !confirm(
        `Are you sure you want to ${
          decision == 0 ? "not recommend" : "recommend"
        } this inspection forward?`
      )
    ) {
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
        inspection_task: `For inspection approval <${formatDateToDash(
          new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        )}>`,
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

  const handleCancellationRecommendation = async (
    decision: number,
    remarks: string
  ) => {
    if ((decision == 1 || decision == 0) && remarks == "")
      return alert("Please fill out all fields.");

    if (
      !confirm(
        `Are you sure you want to ${
          decision == 0 ? "not recommend" : "recommend"
        } this inspection cancellation?`
      )
    ) {
      return;
    }

    setIsLoading(true);

    let inspection: Inspection = {} as Inspection;
    let log: Log = {} as Log;

    if (decision == 0) {
      //Continue with the inspection
      //Previous inspection_task
      const previousInspectionTask = inspectionData.inspection_task
        .split("<")[1]
        .split("/")[2]
        .replace(">", "");

      inspection = {
        ...inspectionData,
        inspection_task: previousInspectionTask,
      };

      log = {
        log_id: "",
        timestamp: new Date().toLocaleString(),
        client_details: inspectionData.client_details as Client,
        author_details: inspectionData.acd_details,
        action: "Cancelled cancellation recommendation",
        author_type: "",
        author_id: "",
      };
    } else if (decision == 1) {
      //Send inspection cancellation to OC approval
      inspection = {
        ...inspectionData,
        inspection_task: `For cancellation approval <${inspectionData.inspection_task
          .split("<")[1]
          .replace(">", "")
          .trim()}/${formatDateToDash(
          new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        )}>`,
      };

      log = {
        log_id: "",
        timestamp: new Date().toLocaleString(),
        client_details: inspectionData.client_details as Client,
        author_details: inspectionData.acd_details,
        action: "Accomplished cancellation recommendation",
        author_type: "",
        author_id: "",
      };
    }

    await firebase.createLog(log, data.acd_id);
    await firebase.updateInspection(inspection);
    setInspectionData(inspection);
    setIsLoading(false);
  };

  const handleSubmittedTO = async () => {
    const inspection: Inspection = {
      ...inspectionData,
      inspection_task: "For COC, IMAT, IMWPR",
    };

    const log: Log = {
      log_id: "",
      timestamp: new Date().toLocaleString(),
      client_details: inspectionData.client_details as Client,
      author_details: inspectionData.acd_details,
      action: "Submitted travel order",
      author_type: "",
      author_id: "",
    };

    await firebase.createLog(log, data.acd_id);
    await firebase.updateInspection(inspection);
    setInspectionData(inspection);
  };

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

  const task = inspectionData.inspection_task?.toLowerCase();

  return (
    <>
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
                <a
                  className="text-primaryBlue"
                  href={inspectionData.inspection_TO}
                  target="_blank"
                >
                  #
                  {extractFilenameFromFirebaseURL(inspectionData.inspection_TO)}
                </a>
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
        ) : task.includes("cancellation recommendation") ? (
          <InspectionCancellation
            inspectionData={inspectionData}
            decision={handleCancellationRecommendation}
            isLoading={isLoading}
          />
        ) : task.includes("coc") ? (
          <COCUpload />
        ) : task.includes("for to") ? (
          <TOUpload
            inspection_id={inspectionData.inspection_id}
            handleSubmittedTO={handleSubmittedTO}
          />
        ) : (
          <PendingWaiting task={task} />
        )}
      </div>
    </>
  );
}
