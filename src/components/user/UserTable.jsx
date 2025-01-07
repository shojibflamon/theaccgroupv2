"use client";
import { CircularProgress, Switch } from "@mui/material";

import { useState } from "react";

import { enqueueSnackbar } from "notistack";
import { useDeleteUser, useGETUser, useUpdateUser } from "@/hooks/user.hooks";
import SeachFeild from "../core/input/SeachFeild";
import UserForm from "./UserForm";
import PaginationButtons from "../core/pagination/PaginationButtons";
import DeleteModal from "../core/modal/DeleteModal";
import UserPassChangeModal from "./UserPassChangeModal";

const COLUMN = ["Sl", "Name", "Email", "User", "Role", "Status", "Action"];

const DeleteAction = ({ id }) => {
  const { mutateAsync, isLoading: isDeletting } = useDeleteUser(id);

  return <DeleteModal handleDelete={mutateAsync} isLoading={isDeletting} />;
};

const StatusSection = ({ instance }) => {
  const { mutateAsync, isLoading } = useUpdateUser(instance?.id);
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
const UserTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGETUser({ q: searchValue });
  // const { mutateAsync, isLoading: isUserUpdating } = useUpdateUser();

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerpage = 25;

  const totalData = data?.length;
  const pageCount = Math.ceil(totalData / dataPerpage);
  const offset = (currentPage - 1) * dataPerpage;
  const limit = currentPage * dataPerpage;

  if (data && data?.slice(offset, limit)?.length == 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="px-2 lg:px-[35px] space-y-5">
      <div className="bg-[#F3F3F6] p-4 lg:p-10 rounded-[20px]">
        <div className="flex justify-between">
          <div className="text-[22px] lg:text-[36px] font-bold">All User</div>
          <div className="flex items-center gap-5">
            <SeachFeild setSearchValue={setSearchValue} />
            <UserForm />
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
                  data
                    .slice(offset, limit)
                    .filter((i) => !i.isSuperAdmin)
                    .map((info, idx) => (
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
                        <td className="px-6 py-4">
                          <div className="space-y-3.5">
                            <p>{info.name}</p>
                            <p className="text-[#828282]">{info.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">{info.email}</td>
                        <td className="px-6 py-4">{info.username}</td>
                        <td className="px-6 py-4">{info?.role?.title}</td>
                        <td className="px-6 py-4">
                          <StatusSection instance={info} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 items-center justify-end">
                            <UserPassChangeModal instance={info} />
                            <UserForm instance={info} />
                            <DeleteAction id={info.id} />
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

export default UserTable;
