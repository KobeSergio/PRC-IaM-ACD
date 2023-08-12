import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col pb-6 bg-[#F9FAFE] px-6 lg:px-12">
      <hr className="bg-[#BDBDBD] h-px "></hr>
      <div className="flex flex-row flex-wrap justify-center lg:justify-between max-lg:gap-2 mt-4">
        <h4 className="font-monts font-semibold text-sm text-[#BDBDBD] text-center lg:text-start">
          Copyright 2023 © Professional Regulation Commission. All Rights
          Reserved.
        </h4>
        <div className="flex flex-row gap-5 items-center">
          <Link
            href={"https://web.facebook.com/professionalregulationcommission"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/assets/icons/fb_logo.svg"}
              width={20}
              height={20}
              alt={"facebook logo"}
            />
          </Link>
          <Link
            href={"https://twitter.com/prc_main"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/assets/icons/twitter_logo.svg"}
              width={20}
              height={20}
              alt={"twitter logo"}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
