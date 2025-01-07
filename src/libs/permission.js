export const havePageAccess = (
  pathname,
  permissionCode = [],
  isSuperAdmin = false
) => {
  let access = false;
  if (isSuperAdmin) {
    return true;
  }
  if (pathname === "/dashboard/hero" && permissionCode.includes(100)) {
    access = true;
  } else if (
    pathname === "/dashboard/about" &&
    permissionCode.includes(200) &&
    permissionCode.includes(300)
  ) {
    access = true;
  } else if (
    (pathname === "/dashboard/product" ||
      pathname === "/dashboard/product/add" ||
      pathname.match("/dashboard/product/edit/")) &&
    permissionCode.includes(800)
  ) {
    access = true;
  } else if (
    pathname === "/dashboard/categoty" &&
    permissionCode.includes(500)
  ) {
    access = true;
  } else if (pathname === "/dashboard/color" && permissionCode.includes(700)) {
    access = true;
  } else if (pathname === "/dashboard/store" && permissionCode.includes(400)) {
    access = true;
  } else if (pathname === "/dashboard/role" && permissionCode.includes(900)) {
    access = true;
  } else if (pathname === "/dashboard/user" && permissionCode.includes(600)) {
    access = true;
  } else if (pathname === "/dashboard") {
    access = true;
  }

  return access;
};

export const haveCategoryPermission = (
  acessIds = [],
  catID,
  isSuperAdmin = false
) => {
  if (isSuperAdmin) {
    return true;
  }
  return acessIds.includes(catID);
};
