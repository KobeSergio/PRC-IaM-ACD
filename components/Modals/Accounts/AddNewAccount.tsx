import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { BsPencil, BsX } from "react-icons/bs";
import { RiArrowDownSFill, RiSearchLine } from "react-icons/ri";

// import Firebase from "@/lib/firebase";
// import { RO } from "@/types/RO";
// import { Client } from "@/types/Client";
// import { Inspection } from "@/types/Inspection";
// const firebase = new Firebase();

export default function AddNewInspection({ isOpen, setter, isLoading }: any) {
  //Loaders
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Dropdown Populators
  // const [regionalOffices, setRegionalOffices] = useState<RO[]>([]);
  // const [clientList, setClientList] = useState<Client[]>([]);

  //Form Values
  const [inspectionYear, setInspectionYear] = useState("curr_year");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("Virtual");
  const [RO, setRO] = useState("");
  const [client, setClient] = useState("New client");

  console.log(RO);

  //New client form values
  const [newClientName, setNewClientName] = useState<string>("");
  const [newClientType, setNewClientType] = useState<string>("Establishment");
  const [newClientEmail, setNewClientEmail] = useState<string>("");
  const [newClientAddress, setNewClientAddress] = useState<string>("");

  //Get list of Regional Offices
  // useEffect(() => {
  //   if (regionalOffices.length == 0) {
  //     firebase
  //       .getAllROs()
  //       .then((res) => {
  //         setRegionalOffices(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //   if (clientList.length == 0) {
  //     firebase
  //       .getAllClients()
  //       .then((res) => {
  //         setClientList(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [isOpen]);

  //Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // if (client == "New client") {
    //   const newClient: Client = {
    //     client_id: "",
    //     name: newClientName,
    //     type: newClientType,
    //     email: newClientEmail,
    //     address: newClientAddress,
    //   };

    //   try {
    //     await firebase.createNewClient(newClient);
    //   } catch (error) {
    //     console.log(error);
    //     alert("Client failed to create");
    //   }
  };

  //   const inspection: Inspection = {
  //     inspection_id: "",
  //     prb_id: "",
  //     ro_id: RO,
  //     acd_id: "",
  //     oc_id: "",
  //     inspection_task: "",
  //     inspection_date: date,
  //     inspection_mode: mode,
  //     inspection_IMAT: "",
  //     inspection_VS: "",
  //     inspection_IMWPR: "",
  //     inspection_COC: "",
  //     createdAt: "",
  //     fulfilledAt: "",
  //   };
  //   try {
  //     await firebase.createInspection(inspection);
  //     alert("Inspection created successfully!");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Inspection failed to create");
  //   }
  //   setter(false);
  //   setIsSubmitting(false);
  // };

  if (isOpen === false) {
    return <></>;
  }
  return (
    <div
      className="fixed z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => setter(false)} // Close the modal when backdrop is clicked
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
                Add New Account
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
                      aria-label="client"
                      onChange={(e) => setClient(e.target.value)}
                      value={client}
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
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <div className="flex">
                    <Spinner /> Adding new account...
                  </div>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
