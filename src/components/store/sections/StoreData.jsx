import { SearchIcon } from "@/components/core/navbar/LandingTopNavbar";
import PaginationButtons from "@/components/core/pagination/PaginationButtons";
import { useGETStore } from "@/hooks/store.hooks";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

const COLUMN = ["Sl", "Outlet Name", "Contact Number", "Email", "Address"];

const StoreData = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGETStore({ q: searchValue });

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerpage = 25;

  const totalData = data?.length;
  const pageCount = Math.ceil(totalData / dataPerpage);
  // console.log(currentPage - 1, currentPage * dataPerpage);
  const offset = (currentPage - 1) * dataPerpage;
  const limit = currentPage * dataPerpage;

  // getting the last data count of table
  let lastDataCount = dataPerpage;
  data?.slice(offset, limit).map((i, idx) => {
    if (data.slice(offset, limit).length == idx + 1) {
      lastDataCount = idx + 1 + offset;
    }
  });

  return (
    <div>
      <div className="flex mb-5 ms-auto text-[#A9A9A9] justify-end items-center bg-[#E7E7E7] p-2 rounded-[20px] w-fit">
        <SearchIcon />{" "}
        <input
          className="inline-block w-[150px] bg-inherit outline-none"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          type="text"
        />
      </div>
      <div
        className={`${
          isLoading || data?.length == 0 ? "h-60" : ""
        } relative tableContainer rounded-tl-2xl rounded-tr-2xl overflow-x-auto xl:rounded-tr-[30px] xl:rounded-tl-[30px]`}
      >
        <table className="w-full  text-left bg-[#F3F3F6]">
          <thead className="top-0 w-full bg-[#2F7CE3] text-white h-fit font-semibold xl:text-lg">
            <tr>
              {COLUMN.map((item, idx) => (
                <th key={Math.random()} scope="col" className={`p-6 `}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="h-1/2 w-full">
            {data &&
              data.slice(offset, limit).map((info, idx) => {
                return (
                  <tr
                    key={Math.random()}
                    className={`border-b  border-[#090629] text-sm xl:text-[16px]`}
                  >
                    <td className="px-3 py-4 xl:px-6 xl:py-8">
                      <p>
                        {idx + offset < 9
                          ? "0" + (idx + 1 + offset)
                          : idx + 1 + offset}
                      </p>
                    </td>

                    <td className="px-3 py-4 min-w-[100px] max-w-[270px] xl:px-6 xl:py-8">
                      {info?.outlet}
                    </td>
                    <td className="px-3 py-4 xl:px-6 xl:py-8">
                      {info?.number}
                    </td>

                    <td className="px-6 py-4 xl:py-8">{info?.email}</td>
                    <td className="px-3 py-4 min-w-[200px] max-w-[310px] xl:px-6 xl:py-8">
                      {info?.address}
                    </td>
                  </tr>
                );
              })}
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
      {data && (
        <div className=" justify-between items-center mt-7 md:flex">
          <h5 className="font-semibold text-[#2F7CE3] mb-4 md:mb-0 lg:text-lg">
            Showing {1 + offset} to {lastDataCount} of {data?.length} Items
          </h5>
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

export default StoreData;
