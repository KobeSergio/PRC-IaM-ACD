import { Spinner } from "@/components/Spinner";
import React, { useState } from "react";
import RegionalOffices from "./RegionalOffices";

import { BsX } from "react-icons/bs";
import { Inspection } from "@/types/Inspection";

export default function FilterModal({
  isOpen,
  setter,
  isLoading,
  inspections,
  setFilteredInspections,
}: any) {
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>({
    //Type
    establishment: false,
    HEI: false,
    //Mode
    physical: false,
    blended: false,
    virtual: false,
    //ROs
    ro_1: false,
    ro_2: false,
    ro_3: false,
    ro_4a: false,
    ro_4b: false,
    ro_5: false,
    ro_6: false,
    ro_7: false,
    ro_8: false,
    ro_9: false,
    ro_10: false,
    ro_11: false,
    ro_12: false,
    ro_13: false,
    ro_ncr: false,
    ro_car: false,
    //Status
    rescheduled: false,
    cancelled: false,
    random: false,
    approved: false,
    additional: false,
    non_copliant: false,
    for_compliance: false,
    compliant: false,
    under_review: false,
  });

  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const onSubmit = () => {
    //If there are no checked checkboxes, set filteredInspections to all inspections
    if (Object.values(checkboxState).every((x) => x === false)) {
      setFilteredInspections(inspections);
      setter();
      return;
    }

    const filteredInspections = inspections.filter((inspection: Inspection) => {
      //Filter by checkboxState
      if (
        (checkboxState.establishment &&
          inspection.client_details.type === "Establishment") ||
        (checkboxState.HEI && inspection.client_details.type === "HEI") ||
        (checkboxState.physical && inspection.inspection_mode === "Physical") ||
        (checkboxState.blended && inspection.inspection_mode === "Blended") ||
        (checkboxState.virtual && inspection.inspection_mode === "Virtual") ||
        (checkboxState.ro_1 &&
          inspection.ro_details.office === "Regional Office I - Rosales") ||
        (checkboxState.ro_2 &&
          inspection.ro_details.office ===
            "Regional Office II - Tuguegarao City") ||
        (checkboxState.ro_3 &&
          inspection.ro_details.office ===
            "Regional Office III - San Fernando City") ||
        (checkboxState.ro_4a &&
          inspection.ro_details.office ===
            "Regional Office IVA - Lucena City") ||
        (checkboxState.ro_4b &&
          inspection.ro_details.office === "Regional Office IVB - MIMAROPA") ||
        (checkboxState.ro_5 &&
          inspection.ro_details.office ===
            "Regional Office V - Legaspi City") ||
        (checkboxState.ro_6 &&
          inspection.ro_details.office ===
            "Regional Office VI - Iloilo City") ||
        (checkboxState.ro_7 &&
          inspection.ro_details.office === "Regional Office VII - Cebu City") ||
        (checkboxState.ro_8 &&
          inspection.ro_details.office ===
            "Regional Office VIII - Tacloban City") ||
        (checkboxState.ro_9 &&
          inspection.ro_details.office ===
            "Regional Office IX - Pagadian City") ||
        (checkboxState.ro_10 &&
          inspection.ro_details.office ===
            "Regional Office X - Cagayan de Oro") ||
        (checkboxState.ro_11 &&
          inspection.ro_details.office === "Regional Office XI - Davao City") ||
        (checkboxState.ro_12 &&
          inspection.ro_details.office === "Regional Office XII - Koronadal") ||
        (checkboxState.ro_13 &&
          inspection.ro_details.office ===
            "Regional Office XIII - Butuan City") ||
        (checkboxState.ro_ncr &&
          inspection.ro_details.office ===
            "National Capital Region (NCR) Office - Manila") ||
        (checkboxState.ro_car &&
          inspection.ro_details.office ===
            "Cordillera Administrative Region (CAR) Office - Baguio City") ||
        //Pre-inspection
        (checkboxState.rescheduled && inspection.status === "Rescheduled") ||
        (checkboxState.cancelled && inspection.status === "Cancelled") ||
        (checkboxState.random && inspection.status === "Random") ||
        (checkboxState.approved && inspection.status === "Approved") ||
        (checkboxState.additional && inspection.status === "Additional") ||
        //Post-inspection
        (checkboxState.non_compliant &&
          inspection.status === "Non-compliant") ||
        (checkboxState.for_compliance &&
          inspection.status === "For compliance") ||
        (checkboxState.compliant && inspection.status === "Compliant") ||
        (checkboxState.under_review && inspection.status === "Under review")
      ) {
        return true;
      }
      return false;
    });

    setFilteredInspections(filteredInspections);
    setter();
  };

  if (isOpen === false) {
    return <></>;
  }
  return (
    <div className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className=" overflow-x-hidden overflow-y-auto fixed w-full h-full inset-0 z-50 outline-none focus:outline-none">
        <div className=" mx-auto w-full max-w-2xl flex items-center justify-center min-h-screen ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between px-4 py-2 border-b border-solid bg-[#F4F6FA] border-slate-200 rounded-t-[8px]">
              <h5 className="font-monts font-bold text-sm text-darkerGray">
                Filter
              </h5>
              <BsX
                className="flex w-4 h-4 object-contain cursor-pointer"
                onClick={setter}
              />
            </div>
            {/*body*/}
            <div className="relative p-6 overflow-y-auto flex-col space-y-6">
              <div className="flex flex-col gap-3">
                <h6 className="font-monts text-sm font-semibold">Type</h6>
                <div className="flex flex-row">
                  <div className="w-1/2 lg:w-1/3 flex items-center">
                    <input
                      id="establishment"
                      type="checkbox"
                      checked={checkboxState.establishment}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="establishment"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Establishment
                    </label>
                  </div>
                  <div className="w-1/2 lg:w-1/3 flex items-center">
                    <input
                      id="HEI"
                      type="checkbox"
                      checked={checkboxState.HEI}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="HEI"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      HEI
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="font-monts text-sm font-semibold">Mode</h6>
                <div className="flex flex-row">
                  <div className="w-1/3 flex items-center">
                    <input
                      id="physical"
                      type="checkbox"
                      checked={checkboxState.physical}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="physical"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Physical
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="blended"
                      type="checkbox"
                      checked={checkboxState.blended}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="blended"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Blended
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="virtual"
                      type="checkbox"
                      checked={checkboxState.virtual}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="virtual"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Virtual
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="font-monts text-sm font-semibold">
                  Regional Office
                </h6>
                <div className="flex flex-row flex-wrap space-y-2">
                  {RegionalOffices().map((office, index) => (
                    <div key={index} className="w-1/3 flex items-center">
                      <input
                        id={office.id}
                        type="checkbox"
                        value={office.id}
                        checked={checkboxState[office.id] || false} //Office id here is dynamic
                        onChange={handleCheckboxChange}
                        className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                      />
                      <label
                        htmlFor={office.id}
                        className="ml-2 font-monts text-sm font-medium text-darkerGray"
                      >
                        {office.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="font-monts text-sm font-semibold">Status</h6>
                <div className="flex flex-row flex-wrap space-y-2">
                  <div className="w-full font-monts text-sm flex items-center">
                    Pre-inspection:
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="rescheduled"
                      type="checkbox"
                      checked={checkboxState.rescheduled}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="rescheduled"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Rescheduled
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="cancelled"
                      type="checkbox"
                      checked={checkboxState.cancelled}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="cancelled"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Cancelled
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="random"
                      type="checkbox"
                      checked={checkboxState.random}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="random"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Random
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="approved"
                      type="checkbox"
                      checked={checkboxState.approved}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="approved"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Approved
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="additional"
                      type="checkbox"
                      checked={checkboxState.additional}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="additional"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Additional
                    </label>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap space-y-2">
                  <div className="w-full font-monts text-sm flex items-center">
                    Post-inspection:
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="under_review"
                      type="checkbox"
                      checked={checkboxState.under_review}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="under_review"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Under review
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="non_compliant"
                      type="checkbox"
                      checked={checkboxState.non_compliant}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="non_compliant"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Non compliant
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="for_compliance"
                      type="checkbox"
                      checked={checkboxState.for_compliance}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="for_compliance"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      For compliance
                    </label>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <input
                      id="compliant"
                      type="checkbox"
                      checked={checkboxState.compliant}
                      onChange={handleCheckboxChange}
                      className="w-[14px] h-[14px] bg-white border-[#E2E3E4] rounded-sm accent-[#3C6497]"
                    />
                    <label
                      htmlFor="compliant"
                      className="ml-2 font-monts text-sm font-medium text-darkerGray"
                    >
                      Compliant
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end py-2 p-6 border-t border-solid border-slate-200 rounded-b">
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
                onClick={() => onSubmit()}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Applying filters...
                  </>
                ) : (
                  "Apply filters"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
