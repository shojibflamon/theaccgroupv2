"use client";
import SeachFeild from "@/components/core/input/SeachFeild";
import { useDeleteRole, useGETRole } from "@/hooks/role.hooks";
import React from "react";
import { useState } from "react";
import RoleForm from "./RoleForm";
import DeleteModal from "@/components/core/modal/DeleteModal";
import { CircularProgress } from "@mui/material";
import PaginationButtons from "@/components/core/pagination/PaginationButtons";
import { MdDeleteForever } from "react-icons/md";

const COLUMN = ["Sl", "Role Name", "Action"];

const DeleteAction = ({ info }) => {
  const { mutateAsync, isLoading: isDeletting } = useDeleteRole(info.id);
  // console.log(info.isDelete,info.title)
  return (
    <DeleteModal
      roleActive={info?.isDelete === false}
      id={info.id}
      handleDelete={mutateAsync}
      isLoading={isDeletting}
    />
  );
};

// default component
const RoleTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGETRole({ q: searchValue });

  //   console.log(isLoading,isDeletting)

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerpage = 25;

  const totalData = data?.length;
  const pageCount = Math.ceil(totalData / dataPerpage);
  // console.log(currentPage - 1, currentPage * dataPerpage);
  const offset = (currentPage - 1) * dataPerpage;
  const limit = currentPage * dataPerpage;

  if (data && data?.slice(offset, limit)?.length == 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="px-2 lg:px-[35px] space-y-5">
      <div className="bg-[#F3F3F6] p-4 lg:p-10 rounded-[20px]">
        <div className="flex justify-between">
          <div className="text-[22px] lg:text-[36px] font-bold">Role</div>
          <div className="flex items-center gap-5">
            <SeachFeild setSearchValue={setSearchValue} />
            <RoleForm />
          </div>
        </div>
        {/* table */}
        <div className="tableContainer overflow-x-auto overflow-hidden">
          <div className="w-full relative tableContainer overflow-y-auto max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-320px)] lg:min-h-[calc(100vh-320px)]">
            <table className="w-full text-left">
              <thead className="sticky bg-[#F3F3F6] z-10 top-0 w-full h-fit text-bbc-dash-7 ">
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
                  !isLoading &&
                  data.slice(offset, limit).map((info, idx) => (
                    <tr
                      key={Math.random()}
                      className={`${
                        idx == 0 ? "border-y" : "border-b"
                      }  border-gray-400 text-bbc-dash-regular-2`}
                    >
                      <td className="px-6 py-4">
                        <p>
                          {idx + offset < 9
                            ? "0" + (idx + 1 + offset)
                            : idx + 1 + offset}
                        </p>
                      </td>
                      <td className="px-6 py-4">{info.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-end">
                          <RoleForm instance={info} />
                          {info?.User?.length > 0 ? (
                            <MdDeleteForever className="text-2xl" />
                          ) : (
                            <DeleteAction info={info} />
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
  );
};

export default RoleTable;
