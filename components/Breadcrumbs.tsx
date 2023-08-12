import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs({ items }: any) {
  return (
    <nav className="flex items-center text-gray-500 font-medium">
      {items.map((item: any, index: any) => (
        <React.Fragment key={index}>
          {item.route ? (
            <>
              <Link
              href={item.route}
                
                className="font-monts font-medium text-xs text-darkGray cursor-pointer hover:underline transition duration-150 ease-in-out"
              >
                {item.name}
              </Link>
            
              <div className="font-monts font-medium text-xs text-darkGray px-2">
                /
              </div>
            </>
          ) : (
            <span className="font-monts font-semibold text-xs text-primaryBlue transition duration-150 ease-in-out">
              {item.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
