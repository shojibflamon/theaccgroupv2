import { Pagination, PaginationItem } from "@mui/material";
import React from "react";

const IconPrev = () => {
  return <span className="text-[#2F7CE3]">PREV</span>;
};
const IconNext = () => {
  return <span className="text-[#2F7CE3]">NEXT</span>;
};

const PaginationButtons = ({ count, currentPage, setCurrentPage }) => {
  return (
    <div>
      <Pagination
        page={currentPage}
        count={count}
        onChange={(_e, value) => setCurrentPage(value)}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: IconPrev, next: IconNext }}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default PaginationButtons;
