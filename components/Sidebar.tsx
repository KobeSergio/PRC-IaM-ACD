"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  BsGrid,
  BsCalendar3,
  BsBook,
  BsPeople,
  BsBoxArrowInLeft,
} from "react-icons/bs";

export default function Sidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const pathname = usePathname();
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  } as const;

  const content = [
    {
      title: "Dashboard",
      icon: <BsGrid size={18} />,
      route: "/dashboard",
    },
    {
      title: "Inspection Calendar",
      icon: <BsCalendar3 size={18} />,
      route: "/inspection-calendar",
    },
    {
      title: "Logs",
      icon: <BsBook size={18} />,
      route: "/logs",
    },
    {
      title: "Accounts",
      icon: <BsPeople size={18} />,
      route: "/accounts",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full lg:w-[250px] min-h-full px-6 py-10 flex flex-col justify-start items-center bg-white border border-[#D5D7D8] rounded-[10px]">
      <h3 className="font-monts font-medium text-base text-darkerGray">
        Welcome back, <span className="text-primaryBlue">ACD</span>
      </h3>
      <div className="flex flex-col items-center mt-4">
        <h1 className="font-monts font-medium text-[32px] text-darkerGray">
          {currentDate.toLocaleTimeString(undefined, timeOptions)}
        </h1>
        <h2 className="font-monts font-medium text-base text-darkerGray">
          {currentDate.toLocaleDateString(undefined, dateOptions)}
        </h2>
      </div>
      <hr className="bg-[#BDBDBD] w-full h-px my-4"></hr>
      <div className="w-full space-y-2">
        {content.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.route}
              className={`flex items-center pl-4 pr-2 py-3 font-monts font-semibold text-sm rounded-[10px] cursor-pointer ${
                pathname.includes(item.route)
                  ? "bg-primaryBlue text-white fill-white"
                  : "text-darkGray hover:bg-lightestGray "
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex items-center pl-4 pr-2 py-3 font-monts font-semibold text-sm rounded-[10px] cursor-pointer text-darkGray hover:bg-lightestGray"
        >
          <BsBoxArrowInLeft />
          <span className="ml-3">Logout</span>
        </Link>
      </div>
    </div>
  );
}
