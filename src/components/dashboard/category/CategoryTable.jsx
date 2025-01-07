"use client";
import { useEffect, useState } from "react";

import PaginationButtons from "../../../components/core/pagination/PaginationButtons";
import CategoryModal from "./CategoryModal";
import {
  useDeleteProductCategory,
  useGETProductCategory,
} from "../../../hooks/product.hook";
import { CircularProgress } from "@mui/material";
import DeleteModal from "../../../components/core/modal/DeleteModal";
import SeachFeild from "../../../components/core/input/SeachFeild";
const COLUMN = ["Title", , "S.Number", "Action"];

const DeleteAction = ({ instance }) => {
  const { mutateAsync, isLoading: isDeletting } = useDeleteProductCategory(
    instance.id
  );
  return <DeleteModal handleDelete={mutateAsync} isLoading={isDeletting} />;
};

// default component
const CategoryTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGETProductCategory({ q: searchValue });
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
          <div className="text-[22px] lg:text-[36px] font-bold">Category</div>
          <div className="flex items-center gap-5">
            <SeachFeild setSearchValue={setSearchValue} />
            <CategoryModal />
          </div>
        </div>
        {/* table */}
        <>
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
                    data.slice(offset, limit).map((info, idx) => (
                      <tr
                        key={Math.random()}
                        className={`${
                          idx == 0 ? "border-y" : "border-b"
                        }  border-gray-400 text-bbc-dash-regular-2`}
                      >
                        <td className="px-6 py-4">{info.title}</td>
                        <td className="px-6 py-4">{info.weight_value}</td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-end">
                            <CategoryModal instance={info} />
                            <DeleteAction instance={info} />
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
        </>
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

export default CategoryTable;
