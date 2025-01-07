"use client";
import { useGETProfileData } from "@/hooks/user.hooks";
import { havePageAccess } from "@/libs/permission";
import { usePathname } from "next/navigation";

const RoutePermission = ({ children }) => {
  const pathname = usePathname();
  const { data: user, isLoading } = useGETProfileData();
  const roleCode =
    user?.role?.RolePermission.map((i) => i?.permission?.code) || [];
  const permissionCode =
    user?.UserPermission.map((i) => i?.permission?.code) || [];

  if (isLoading) {
    <div className="flex justify-center items-center">Loading...</div>;
  } else if (
    !havePageAccess(
      pathname,
      [...roleCode, ...permissionCode],
      user?.isSuperAdmin
    )
  ) {
    return <div className="flex justify-center items-center">Unauthorize</div>;
  } else {
    return <div>{children}</div>;
  }
};

export default RoutePermission;
