import React, { useState } from "react";
import { Inspection } from "@/types/Inspection";
import { BsX } from "react-icons/bs";
import Sections from "../IMWPR/Sections";
import {
  sectionA,
  sectionB,
  sectionC,
  sectionD,
  sectionE,
  sectionF,
  sectionG,
  sectionH,
  sectionI,
  sectionJ,
  sectionK,
  sectionL,
  sectionM,
  sections,
} from "@/lib/imwprSections";
import Summary from "../IMWPR/Summary";
import { IMWPR, IMWPRContent } from "@/types/IMWPR";

export default function IMWPR({ IMWPRDetails }: { IMWPRDetails: IMWPR }) {
  return (
    <div className="h-full w-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-2">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        INSPECTION AND MONITORING WORK PROGRAM AND REPORT (IMWPR)
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col space-y-4">
          <h6 className="font-monts font-semibold text-sm text-darkerGray">
            Inspection and monitoring team:
          </h6>
          <div className="w-full flex flex-row flex-wrap gap-2 justify-end">
            {IMWPRDetails.inspection_team.map((inspector: any, index: any) => {
              return (
                <div key={index} className="relative flex items-center w-full">
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={inspector}
                    disabled
                    className="text-[#7C7C7C] flex-1 border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block p-2.5 outline-none pr-6" // Added pr-6 to avoid overlap with the X button
                  />
                </div>
              );
            })}
          </div>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-5">
          <h6 className="font-monts font-semibold text-sm text-darkerGray">
            Findings and recommendations:
          </h6>
          {/* A. Department Head/Chair */}
          <Sections
            sectionId={0}
            title={"A. Department Head/Chair"}
            content={sectionA}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* B. Faculty */}
          <Sections
            sectionId={1}
            title={"B. Faculty"}
            content={sectionB}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* C. Curriculum and Instruction */}
          <Sections
            sectionId={2}
            title={"C. Curriculum and Instruction"}
            content={sectionC}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* D. Laboratory Facilities and Equipment */}
          <Sections
            sectionId={3}
            title={"D. Laboratory Facilities and Equipment"}
            content={sectionD}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* E. Library */}
          <Sections
            sectionId={4}
            title={"E. Library"}
            content={sectionE}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* F. Practicum */}
          <Sections
            sectionId={5}
            title={"F. Practicum"}
            content={sectionF}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* G. Research and Extension */}
          <Sections
            sectionId={6}
            title={"G. Research and Extension"}
            content={sectionG}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* H. Recruitment and Retention of Students */}
          <Sections
            sectionId={7}
            title={"H. Recruitment and Retention of Students"}
            content={sectionH}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* I. Performance in the Licensure Exam for the past five years */}
          <Sections
            sectionId={8}
            title={
              "I. Performance in the Licensure Exam for the past five years"
            }
            content={sectionI}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* J. Tracers Study of Alumni */}
          <Sections
            sectionId={9}
            title={"J. Tracers Study of Alumni"}
            content={sectionJ}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* K. Uniqueness of the BS ND Program */}
          <Sections
            sectionId={10}
            title={"K. Uniqueness of the BS ND Program"}
            content={sectionK}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* L. Challenges Encountered in the BS ND Program */}
          <Sections
            sectionId={11}
            title={"L. Challenges Encountered in the BS ND Program"}
            content={sectionL}
            selectedAnswers={IMWPRDetails.findings}
          />
          <hr className="w-full border-[#D5D7D8]"></hr>
          {/* M. Students’ Feedback */}
          <Sections
            sectionId={12}
            title={"M. Students' Feedback"}
            content={sectionM}
            selectedAnswers={IMWPRDetails.findings}
          />
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-2">
          <h6 className="font-monts font-semibold text-sm text-darkerGray">
            Other comments:
          </h6>
          <textarea
            value={IMWPRDetails.other_comments}
            rows={3}
            disabled
            className="w-full text-[#7C7C7C] border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
          />
          <h6 className="font-monts font-semibold text-sm text-darkerGray">
            Recommendations:
          </h6>
          <textarea
            rows={3}
            disabled
            value={IMWPRDetails.recommendations}
            className="w-full text-[#7C7C7C] border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
          />
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h6 className="font-monts font-semibold text-sm text-darkerGray">
              IMWPR Summary:
            </h6>
            <Summary selectedAnswers={IMWPRDetails.findings} />
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="font-monts font-semibold text-sm text-darkerGray">
              Compliance Decision:
            </h6>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center">
                <input
                  name={`item_compliance_forIssuance`}
                  id="compliance"
                  type="radio"
                  checked={IMWPRDetails.compliance_decision === "compliant"}
                  disabled
                  className="w-4 h-4 accent-primaryBlue"
                />
                <label
                  htmlFor="compliance"
                  className="ml-2 font-monts font-medium text-sm text-darkerGray"
                >
                  For issuance of Certificate of Compliance
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="monitoring"
                  type="radio"
                  checked={
                    IMWPRDetails.compliance_decision === "for-compliance"
                  }
                  disabled
                  className="w-4 h-4 accent-primaryBlue"
                />
                <label
                  htmlFor="monitoring"
                  className="ml-2 font-monts font-medium text-sm text-darkerGray"
                >
                  For monitoring/for-compliance
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="non-compliant"
                  type="radio"
                  checked={IMWPRDetails.compliance_decision === "non-compliant"}
                  disabled
                  className="w-4 h-4 accent-primaryBlue"
                />
                <label
                  htmlFor="non-compliant"
                  className="ml-2 font-monts font-medium text-sm text-darkerGray"
                >
                  Non-compliant
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
      </form>
    </div>
  );
}
