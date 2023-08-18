"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = true;
  const [providers, setProviders] = useState(null);

  //   useEffect(() => {
  //     (async () => {
  //       const res = await getProviders();
  //       setProviders(res);
  //     })();
  //   }, []);

  return (
    <nav className="w-full relative z-40 bg-white shadow">
      <div className="justify-between px-6 lg:px-12 mx-auto lg:items-center lg:flex">
        <div className="flex items-center justify-between py-3 ">
          <div className="flex flex-row gap-3 items-center">
            <Link href="/">
              <Image
                src={"assets/images/prc_logo.svg"}
                width={58}
                height={58}
                alt={"PRC Logo"}
                className="max-md:w-[50px] max-md:h-[50px]"
              />
            </Link>
            <h1 className="font-monts font-semibold text-base lg:text-xl text-primaryBlue">
              PRC Application Management System
            </h1>
          </div>
        </div>
        <h3 className="font-monts font-semibold text-base text-darkerGray">
          ACD 1
        </h3>
      </div>
    </nav>
  );
}
