import { Inspection } from "@/types/Inspection";
import IMWPR from "../InspectionSummary/IMWPR/IMWPR";
import { useState } from "react";
import IMATVS from "../InspectionSummary/IMATVS/IMAT";

export default function InspectionSummary({
  inspectionDetails,
}: {
  inspectionDetails: Inspection;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-[10px] items-start">
      <div className="flex w-full p-3 items-start gap-6">
        <p
          onClick={() => setSelected(0)}
          className={`font-monts cursor-pointer ${
            selected == 0
              ? "text-primaryBlue text-base font-bold underline"
              : "text-darkerGray"
          }`}
        >
          IMWPR
        </p>
        <p
          onClick={() => setSelected(1)}
          className={`font-monts cursor-pointer ${
            selected == 1
              ? "text-primaryBlue text-base font-bold underline"
              : "text-darkerGray"
          }`}
        >
          IMAT & VS
        </p>
      </div>
      {selected == 0 ? (
        <IMWPR IMWPRDetails={inspectionDetails.inspection_IMWPR as any} />
      ) : selected == 1 ? (
        <IMATVS
          IMATDetails={inspectionDetails.inspection_IMAT as any}
          VSDetails={inspectionDetails.inspection_VS}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
