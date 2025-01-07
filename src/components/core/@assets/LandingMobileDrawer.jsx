'use client'
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Image from "next/image";
import NavLogo from "../@media/Logo.png";
import Link from "next/link";

import { useRouter } from "next/navigation";

const MenuData = () => {
  const router = useRouter();
  return (
    <div>
      <ul className="mt-4">
        <Link
          href="/"
          className={router.pathname === "/" ? "text-[#0091CD]" : ""}
        >
          {" "}
          <li className="mb-2">
            <span className="mr-3 "></span>Home
          </li>
        </Link>
        <Link
          href="/about"
          className={router.pathname === "/about" ? "text-[#0091CD]" : ""}
        >
          {" "}
          <li className="mb-2">
            <span className="mr-3 "></span>About Us
          </li>
        </Link>
        {/* <Link href="/">
          <li className="mb-2">
            <span className="mr-3"></span>Request Service
          </li>
        </Link> */}
        <Link
          href="/request-service"
          className={
            router.pathname === "/request-service" ? "text-[#0091CD]" : ""
          }
        >
          <li className="flex items-center mb-2 ">
            <span className="mr-3"></span>Request Service
          </li>
        </Link>
        <Link
          href="/store"
          className={router.pathname === "/store" ? "text-[#0091CD]" : ""}
        >
          <li className="flex items-center mb-2 ">
            <span className="mr-3"></span>Find A Store
          </li>
        </Link>
      </ul>
    </div>
  );
};

/** main component */
const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(!open)}>
        <div className=" w-72 p-5 ">
          <div className="flex justify-between items-center border-b">
            <Link href="/" className=" ">
              <Image className="w-20" src={NavLogo} alt="" priority />
            </Link>
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <ul onClick={() => setOpen(!open)}>
            <MenuData />
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileDrawer;
