"use client";
import NavLogo from "../@media/Logo.png";
import AppIcon from "../@media/App Icon.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import MobileDrawer from "../@assets/LandingMobileDrawer";

import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { TextField } from "@mui/material";
import { usePathname } from "next/navigation";
import { useGetProduct } from "@/hooks/product.hook";

const SearchSection = ({ search, setSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetProduct({ q: searchValue });

  return (
    <div className="bg-white border p-5 rounded-2xl">
      <div>
        <TextField
          fullWidth
          size="medium"
          name="title"
          className="w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          label="Search Here"
        />
      </div>
      {searchValue != "" &&
        (isLoading ? (
          "loading..."
        ) : data?.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto">
            {data?.map((i, idx) => {
              return (
                <Link
                  href={`/product/${i?.category?.title
                    .toLowerCase()
                    .replace(/\s/g, "-")}/${i?.slug}`}
                  onClick={() => {
                    setSearch(!search);
                    setSearchValue("");
                  }}
                  className="flex gap-8 items-center border-b py-4"
                  key={idx}
                >
                  <div className="w-14 h-14 bg-slate-200 rounded-md">
                    <Image
                      src={i.thumbnail}
                      width={56}
                      height={56}
                      alt="product-img"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">{i.title}</p>
                    <p className="px-2 py-1 rounded-2xl bg-[#a4c1e7] text-xs w-fit">
                      {i.model}
                    </p>
                    <p className="text-[#2F7CE3]">TK {i.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-2">No results found!</p>
        ))}
    </div>
  );
};

const TopNavbar = ({ search, setSearch }) => {
  return (
    <>
      <nav className="top-0 w-full  border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
          <div className="flex justify-between  ">
            <div className="">
              <Link href="/" className=" ">
                <Image
                  className="w-28"
                  src={NavLogo}
                  alt="main_logo"
                  priority
                />
              </Link>
            </div>

            <div className="ml-3 gap-3 flex items-center">
              <Link
                href="https://play.google.com/store/apps/details?id=com.acc.home&pli=1"
                className="w-24"
              >
                <Image src={AppIcon} alt="google_play_logo" priority />
              </Link>
              <li className="border rounded-full p-[2px] flex border-black cursor-pointer md:p-1">
                {search ? (
                  <RxCross2 onClick={() => setSearch(!search)} />
                ) : (
                  <IoIosSearch onClick={() => setSearch(!search)} />
                )}
              </li>
              <MobileDrawer />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export const NevagationLink = ({ url, text }) => {
  return <Link href={url}>{text}</Link>;
};

export const SearchIcon = () => {
  return (
    <>
      <AiOutlineSearch className="text-2xl" />
    </>
  );
};

// deafult top navbar
const LandingTopNavbar = () => {
  const pathname= usePathname();
  const [search, setSearch] = useState(false);
  return (
    <nav className="sticky top-0 z-20 bg-white">
      <div className="relative">
        <div className="container mx-auto lg:py-4  pl-2 xl:pl-0   ">
          <div className="lg:grid lg:grid-cols-12 w-full">
            {/* logo section */}
            <Link href="/" className="hidden lg:col-span-3 lg:block">
              <Image src={NavLogo} alt="main_logo" priority />
            </Link>

            {/* dextop menu sectiion */}
            <div className="hidden lg:col-span-6 lg:inline-block">
              <ul className=" hidden w-fit mx-auto lg:text-[16px] xl:text-lg lg:flex  lg:space-x-7  items-center border border-[#E4E4E4] lg:px-[10px] xl:px-[30px] py-[15px] rounded-full">
                <li className={pathname === "/" ? "text-[#2F7CE3]" : ""}>
                  <NevagationLink url="/" text="Home" />
                </li>
                <li className={pathname === "/about" ? "text-[#2F7CE3]" : ""}>
                  <NevagationLink url="/about" text="About Us" />
                </li>
                {/* <li>
                // <NevagationLink url="#" text="Request Service" />
              </li> */}
                <li
                  className={
                    pathname === "/request-service" ? "text-[#2F7CE3]" : ""
                  }
                >
                  <NevagationLink
                    url="/request-service"
                    text="Request Service"
                  />
                </li>
                <li className={pathname === "/store" ? "text-[#2F7CE3]" : ""}>
                  <NevagationLink url="/store" text="Find A Store" />
                </li>
                <l
                  onClick={() => setSearch(!search)}
                  i
                  className="border rounded-full p-2 border-black cursor-pointer"
                >
                  {search ? <RxCross2 /> : <IoIosSearch />}
                </l>
                {/* <li>
                <SearchIcon />
              </li>
              
              <li>
                <button className=" bg-[#4852AE] py-[10px] px-[20px] text-white rounded-full">
                  Login
                </button>
              </li> */}
              </ul>
            </div>
            {/* icons */}
            <div className=" flex justify-end lg:col-span-3">
              <div className="hidden ml-4 lg:inline-block xl:ml-0">
                <ul className="flex space-x-2 items-center ">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.acc.home&pli=1"
                    className="hidden lg:block"
                  >
                    <Image src={AppIcon} alt="google_play_logo" priority />
                  </Link>
                </ul>
              </div>
            </div>
            <div className="lg:hidden w-full">
              <TopNavbar search={search} setSearch={setSearch} />
            </div>
          </div>
        </div>
        <div
          className={`${
            search ? "top-16 lg:top-24" : " -top-[1000px]"
          } transition-all mx-auto z-50 absolute left-1/2 -translate-x-1/2 w-[300px] md:w-[600px]`}
        >
          <SearchSection search={search} setSearch={setSearch} />
        </div>
      </div>
    </nav>
  );
};

export default LandingTopNavbar;
