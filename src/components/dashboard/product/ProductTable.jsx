"use client";
import SeachFeild from "@/components/core/input/SeachFeild";
import {
  useDeleteProduct,
  useGetProduct,
  useUpdateProduct,
} from "@/hooks/product.hook";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { CircularProgress, MenuItem, Popover, Switch } from "@mui/material";
import Image from "next/legacy/image";
import { enqueueSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import { FiEdit } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

import DeleteModal from "@/components/core/modal/DeleteModal";
import PaginationButtons from "@/components/core/pagination/PaginationButtons";
import { FeaturedIcon } from "@/components/core/icons/DashboardIcons";
import { FeaturedProductsStore } from "@/libs/store/feature.store";
import FeaturedProductSection from "./FeaturedProductSection";
import { useGETProfileData } from "@/hooks/user.hooks";
import { haveCategoryPermission } from "@/libs/permission";

const COLUMN = [
  "Image",
  "Product",
  "Price",
  "S.Number",
  "Feature",
  "Status",
  "Action",
];

const Actions = ({ instance, id: prodId }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { feateredProducts, setFeatureProduct } = FeaturedProductsStore();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { mutateAsync, isLoading: isDeletting } = useDeleteProduct(prodId);
  const productData = [];
  // console.log(productData);
  return (
    <div>
      <button className="">
        <BsThreeDotsVertical
          className="cursor-pointer"
          aria-describedby={id}
          variant="contained"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        />
      </button>
      {anchorEl && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableRestoreFocus
          // sx={{ opacity: openInventoryModal ? 0 : 1 }}
        >
          <div className="p-2">
            {feateredProducts?.find((i) => i.id == instance.id) ? (
              ""
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    if (feateredProducts?.length > 4) {
                      return enqueueSnackbar(
                        "can not add more than 5 products to feature products!",
                        { variant: "error" }
                      );
                    }
                    instance.sl = feateredProducts?.length + 1;
                    productData.push(instance);
                    setFeatureProduct([...feateredProducts, ...productData]);
                  }}
                  className="flex gap-3 items-center"
                >
                  <FeaturedIcon /> Make Feature
                </MenuItem>
              </>
            )}

            <a href={`/dashboard/product/edit/${instance.id}`}>
              <MenuItem className="flex items-center gap-3">
                <FiEdit size={20} className="" />
                Edit Product
              </MenuItem>
            </a>
            {/* <AddInventoryToProduct instance={instance} /> */}
            <DeleteModal
              text={true}
              id={prodId}
              handleDelete={mutateAsync}
              isLoading={isDeletting}
            />
          </div>
        </Popover>
      )}
    </div>
  );
};

// status section
const StatusSection = ({ instance }) => {
  const { mutateAsync, isLoading } = useUpdateProduct(instance?.id);
  const handleStatus = async () => {
    instance.loading = true;
    let data;
    if (instance.isActive) {
      data = { id: instance.id, isActive: false };
    } else {
      data = { id: instance.id, isActive: true };
    }
    await mutateAsync(data);
    enqueueSnackbar("Updated user status.", { variant: "success" });
    instance.loading = false;
  };

  return (
    <div className="flex w-28 items-center">
      <Switch onClick={handleStatus} checked={instance?.isActive} />
      {instance?.loading && isLoading && <CircularProgress size={16} />}
    </div>
  );
};

// default component
const ProductTable = () => {
  const { data: user } = useGETProfileData();
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetProduct({ q: searchValue });
  const [currentPage, setCurrentPage] = useState(1);
  const { push } = useRouter();

  const totalData = data?.length;
  const dataPerpage = 25;
  const pageCount = Math.ceil(totalData / dataPerpage);
  const offset = (currentPage - 1) * dataPerpage;
  const limit = currentPage * dataPerpage;
  // const productData = [];

  if (data && data?.slice(offset, limit)?.length == 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
  const catIdFromRole =
    user?.role?.RolePermission.map((i) => i?.categoryId) || [];
  const catIdFromPermission =
    user?.UserPermission.map((i) => i?.categoryId) || [];

  return (
    <div>
      <div className="px-2 lg:px-[35px] space-y-10">
        <FeaturedProductSection />
        <div className="bg-[#F3F3F6] p-4 lg:p-10 rounded-[20px]">
          <div className="flex justify-between mb-5">
            <div className="text-[22px] lg:text-[36px] font-bold">Product</div>
            <div className="flex items-center gap-5">
              <SeachFeild setSearchValue={setSearchValue} />
              <button
                className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] capitalize rounded-[10px] flex items-center gap-2 disabled:bg-slate-400"
                variant="outlined"
                onClick={() => push("/dashboard/product/add")}
              >
                Add Product
                <AddIcon />
              </button>
            </div>
          </div>
          {/* table */}
          <div className="tableContainer overflow-x-auto overflow-hidden">
            <div className="w-full relative tableContainer overflow-y-auto max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-320px)] lg:min-h-[calc(100vh-320px)]">
              <table className="w-full text-left">
                <thead className="sticky z-10 top-0 w-full bg-[#F3F3F6] h-fit text-bbc-dash-7 ">
                  <tr>
                    {COLUMN.map((item, idx) => (
                      <th
                        key={Math.random()}
                        scope="col"
                        className={`p-6 ${
                          idx + 1 === COLUMN.length && "text-right"
                        }`}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="h-1/2 w-full">
                  {data &&
                    data.slice(offset, limit).map((info, idx) => (
                      <tr
                        key={Math.random()}
                        className={`${
                          idx == 0 ? "border-y" : "border-b"
                        }  border-gray-400 text-bbc-dash-regular-2`}
                      >
                        <td className="px-6 py-4">
                          <Image
                            className="rounded-xl"
                            src={info.thumbnail}
                            width={92}
                            height={92}
                            alt="product-img"
                          />
                        </td>

                        <td className="px-6 py-4 max-w-[270px]">
                          {info.title}
                        </td>
                        <td className="px-6 py-4">{info.price}</td>
                        <td className="px-6 py-4">{info.weight_value}</td>
                        <td className="px-6 py-4 w-4">
                          {info?.FeatureProduct?.length > 0 && (
                            <p className="px-2 rounded-xl text-white w-fit text-sm bg-[#2F7CE3]">
                              Featured
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 w-4">
                          <StatusSection instance={info} />
                        </td>

                        <td className="px-6 py-4 ">
                          <div className="flex gap-2 justify-end">
                            {user &&
                            haveCategoryPermission(
                              [...catIdFromRole, ...catIdFromPermission],
                              info.categoryId,
                              user?.isSuperAdmin
                            ) ? (
                              <Actions instance={info} id={info.id} />
                            ) : (
                              <p className="text-red-400">No Access</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {isLoading && (
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 justify-center items-center">
                  <CircularProgress />
                </div>
              )}
              {data?.length === 0 && (
                <div className="absolute text text-bbc-dash-d-2 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 justify-center items-center">
                  No Data Available!
                </div>
              )}
            </div>
          </div>
        </div>
        {data && (
          <div className="flex justify-end">
            <PaginationButtons
              count={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
