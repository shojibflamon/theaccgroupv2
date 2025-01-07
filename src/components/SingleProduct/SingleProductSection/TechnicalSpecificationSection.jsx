import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TechnicalSpecificationSection = ({ technicalSpecification = {} }) => {
  const [value, setValue] = useState(0);

  return (
    <div className="lg:mt-8 mt-2">
      <div className="  mb-[20px] flex gap-6">
        <div className="flex  gap-[10px] flex-col lg:w-[30%] w-full">
          <div className=" gap-5  font-medium text-[20px]  cursor-pointer   ">
            <div className="flex flex-col gap-2">
              {technicalSpecification
                .sort((a, b) => b.sl - a.sl)
                .map((i, idx) => (
                  <div
                    key={Math.random()}
                    onClick={() => setValue(idx)}
                    className={`${
                      idx === value ? "bg-[#2F7CE326]" : "bg-[#F3F3F6]"
                    } pl-[30px] py-2 pr-[100px]  capitalize  hover:bg-[#2F7CE326] rounded-md hidden lg:block`}
                  >
                    {i?.title}
                  </div>
                ))}
            </div>
            <li className="rounded-md  block lg:hidden ">
              <div className="relative">
                {technicalSpecification
                  .sort((a, b) => b.sl - a.sl)
                  .map((i, idx) => (
                    <Accordion
                      key={Math.random()}
                      sx={{
                        boxShadow: "none",
                        borderRadius: "none",
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="flex flex-col capitalize">
                          {i?.title}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <div className="whitespace-pre-line text-[16px]">
                            {i?.details}
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </div>
            </li>
          </div>
        </div>

        <div className="lg:w-[70%]  hidden lg:block ">
          <div key={Math.random()} className="">
            <div className="bg-[#F3F3F6] w-full h-full py-2 pl-8 font-medium text-[16px] whitespace-pre-line">
              {technicalSpecification?.[value]?.details}
            </div>
            {/* <textarea
              disabled
              rows="15"
              value={technicalSpecification?.[value].details}
              key={Math.random()}
              className="bg-[#F3F3F6] w-full h-full py-2 pl-8 font-medium text-[16px]"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecificationSection;
