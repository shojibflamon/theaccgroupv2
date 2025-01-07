import React from "react";
import DashboardTopNavbar from "../../components/core/navbar/DashboardTopNavbar";
import DashoardAsideBar from "../../components/core/aside/DashoardAsideBar";
import AuthPage from "@/components/core/auth/AuthPage";
import RoutePermission from "@/components/core/auth/RoutePermission";

const DashboardTemplate = ({ children }) => {

  return (
    <AuthPage>
      <RoutePermission>
        <DashboardTopNavbar />
        <DashoardAsideBar />
        <div className="mt-[70px] px-2 p-[35px] lg:pl-[300px]"> {children}</div>
      </RoutePermission>
    </AuthPage>
  );
};

export default DashboardTemplate;
