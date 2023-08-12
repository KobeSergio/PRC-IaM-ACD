"use client";

import Image from "next/image";
import { useState } from "react";
// import Firebase from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
// const firebase = new Firebase();

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // if (email && password) {
    //   setIsLoading(true);
    //   const response = await firebase.signIn(email, password);
    //   if (response === 200) {
    //     //redirect to dashboard
    //     router.push("/dashboard");
    //     setIsLoading(false);
    //   } else if (response === 401 || response === 400) {
    //     alert("Invalid credentials");
    //   } else if (response === 500) {
    //     alert("Something went wrong");
    //   }
    router.push("/dashboard");
      setIsLoading(false);
    // }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen  z-50 bg-white px-6 py-12 lg:py-24">
      <Image
        src={"assets/images/prc_logo.svg"}
        width={120}
        height={120}
        alt={"PRC Logo"}
        className="w-[82px] lg:w-[120px] h-[82px] lg:h-[120px]"
      />
      <h2 className="font-monts text-xl text-primaryBlue font-bold text-center mt-6">
        PRC INSPECTION AND MONITORING SYSTEM
      </h2>
      <form className="max-w-lg mx-auto p-4 mt-6">
        <div className="flex items-center border-2 border-[#CED4DA] px-4 py-2 rounded-lg">
          <span>
            <Image
              src={"assets/icons/envelope.svg"}
              width={18}
              height={18}
              alt={"envelope icon"}
            />{" "}
          </span>
          <input
            className="appearance-none bg-transparent border-none w-full font-monts font-medium text-sm text-darkerGray ml-2 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Email address"
            aria-label="Email address"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center border-2 border-[#CED4DA] px-4 py-2 rounded-lg mt-4">
          <span>
            <Image
              src={"assets/icons/key.svg"}
              width={18}
              height={18}
              alt={"envelope icon"}
            />{" "}
          </span>
          <input
            className="appearance-none bg-transparent border-none w-full font-monts font-medium text-sm text-darkerGray ml-2 py-1 px-2 leading-tight focus:outline-none"
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {/* <div className="flex justify-end items-center mt-4">
          <h4 className="font-monts font-medium text-xs italic text-primaryBlue hover:underline underline-offset-4 cursor-pointer">
            Forgot password?
          </h4>
        </div> */}
        <button
          onClick={handleSubmit}
          className="w-full bg-primaryBlue hover:bg-[#365592] font-monts font-semibold text-center text-sm  text-white py-3 px-5 rounded-lg mt-6 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
