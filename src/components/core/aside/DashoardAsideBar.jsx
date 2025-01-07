"use client";
import Link from "next/link";

import {
  AboutIcon,
  ColorListIcon,
  HeroImageIcon,
  ProductCategoryIcon,
  ProductIcon,
  RoleIcon,
  StoreIcon,
  UserIcon,
} from "../icons/DashboardIcons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { usePathname } from "next/navigation";
import { useGETProfileData } from "@/hooks/user.hooks";
import { havePageAccess } from "@/libs/permission";

export const MenuData = () => {
  const pathname = usePathname();
  const { data: user, isLoading } = useGETProfileData();
  const roleCode =
    user?.role?.RolePermission.map((i) => i?.permission?.code) || [];
  const permissionCode =
    user?.UserPermission.map((i) => i?.permission?.code) || [];

  return (
    <div>
      <ul className="mt-4 pl-[20px] lg:pt-4 mr-6">
        <Link
          href="/dashboard"
          className={`ml-2 mb-3 py-3 pl-3 pr-12 flex gap-1 items-center rounded-[10px]   ${
            pathname == "/dashboard" ? "bg-[#2F7CE326]" : "bg-[#F3F3F6]"
          }`}
        >
          <DashboardIcon className="mr-3" />
          Dashboard
        </Link>
        <div className="font-medium text-[20px] mt-9 mb-4">Pages</div>
        {havePageAccess(
          "/dashboard/hero",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/hero">
            <li
              className={`ml-2 mb-3 flex items-center py-3 rounded-[10px]  border ${
                pathname == "/dashboard/hero"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <HeroImageIcon />
              </span>
              Hero Image
            </li>
          </Link>
        )}

        {havePageAccess(
          "/dashboard/about",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/about">
            <li
              className={`ml-2 flex items-center mb-3 py-3 rounded-[10px]  border ${
                pathname == "/dashboard/about"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <AboutIcon />
              </span>
              About Page
            </li>
          </Link>
        )}

        {havePageAccess(
          "/dashboard/product",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/product">
            <li
              className={`ml-2 flex items-center mb-3 py-3 rounded-[10px]  border ${
                pathname == "/dashboard/product"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <ProductIcon />
              </span>
              Product
            </li>
          </Link>
        )}

        {havePageAccess(
          "/dashboard/categoty",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/categoty">
            <li
              className={`ml-2 flex items-center mb-3 py-3 rounded-[10px]  border ${
                pathname == "/dashboard/categoty"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <ProductCategoryIcon />
              </span>
              Product Category
            </li>
          </Link>
        )}

        {havePageAccess(
          "/dashboard/color",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/color">
            <li
              className={`ml-2 flex items-center mb-3 py-3 rounded-[10px]  border ${
                pathname == "/dashboard/color"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <ColorListIcon />
              </span>
              Color List
            </li>
          </Link>
        )}

        {havePageAccess(
          "/dashboard/store",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/store">
            <li
              className={`ml-2 flex items-center mb-3 py-3 rounded-[10px]  border ${
                pathname == "/dashboard/store"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <StoreIcon />
              </span>
              Our Store
            </li>
          </Link>
        )}

        {havePageAccess(
          "/dashboard/role",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/role">
            <li
              className={`ml-2 flex items-center mb-3 py-3 rounded-[10px]  border ${
                pathname == "/dashboard/role"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <RoleIcon />
              </span>
              All Role
            </li>
          </Link>
        )}

        {havePageAccess(
          "/dashboard/user",
          [...roleCode, ...permissionCode],
          user?.isSuperAdmin
        ) && (
          <Link href="/dashboard/user">
            <li
              className={`ml-2 flex items-center mb-3 py-3 rounded-[10px]  border ${
                pathname == "/dashboard/user"
                  ? "bg-[#2F7CE326]"
                  : "bg-[#F3F3F6]"
              } `}
            >
              <span className="mr-3 pl-3 ">
                <UserIcon />
              </span>
              All User
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

const DashoardAsideBar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-72 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 ">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-[#F3F3F6] ">
        <ul className="space-y-2 ">
          {" "}
          <MenuData />{" "}
        </ul>
      </div>
    </aside>
  );
};

export default DashoardAsideBar;
