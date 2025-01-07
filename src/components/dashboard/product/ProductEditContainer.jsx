"use client";
import React from "react";
import ProductForm from "./ProductForm";
import { useGETProfileData } from "@/hooks/user.hooks";
import { notFound } from "next/navigation";
import { haveCategoryPermission } from "@/libs/permission";

const ProductEditContainer = ({ instance }) => {
  const { data: user } = useGETProfileData();
  const catIdFromRole =
    user?.role?.RolePermission.map((i) => i?.categoryId) || [];
  const catIdFromPermission =
    user?.UserPermission.map((i) => i?.categoryId) || [];
    console.log( haveCategoryPermission(
        [...catIdFromRole, ...catIdFromPermission],
        instance.categoryId,
        user?.isSuperAdmin
      ))
  if (
    user &&
    haveCategoryPermission(
      [...catIdFromRole, ...catIdFromPermission],
      instance.categoryId,
      user?.isSuperAdmin
    )
  ) {
    return (
      <div>
        <ProductForm instance={instance} />
      </div>
    );
  } else {
    notFound();
  }
};

export default ProductEditContainer;
