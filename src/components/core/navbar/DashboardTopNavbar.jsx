"use client";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { useGETProfileData } from "@/hooks/user.hooks";

const DashboardTopNavbar = () => {
  const { data: profileData, isLoading } = useGETProfileData();
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* <MobileDashboardDrawer /> */}
              <Link href="/" className="flex ml-2 md:mr-24 w-28 lg:pl-[24px]">
                <Image src={"/logo.png"} alt="logo" width={129} height={55} />
              </Link>
            </div>
            <div className="flex items-center mr-2">
              <div className="flex items-center ml-3">
                <span className="flex items-center">
                  <div className="mr-3">
                    <Avatar
                      alt="User"
                      src={profileData ? profileData?.avater : "#"}
                    />
                  </div>
                  <div className="hidden lg:block">
                    <div
                      type="button"
                      className="flex text-lg  "
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* {profileData && profileData?.role ? (
                        <span>{profileData?.role}</span>
                      ) : (
                        "Super Admin"
                      )} */}
                      <span>{profileData && profileData?.name}</span>
                    </div>
                  </div>
                  <div className="ml-3 cursor-pointer" onClick={signOut}>
                    <LogoutIcon />
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardTopNavbar;
