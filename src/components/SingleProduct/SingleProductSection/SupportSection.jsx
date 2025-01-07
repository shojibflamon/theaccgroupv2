import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const SupportSection = ({ support }) => {
  const [value, setValue] = useState(0);

  return (
    <div className="lg:mt-8 mt-2">
      <div className="  mb-[20px] flex gap-6">
        <div className="flex  gap-[10px] flex-col lg:w-[30%] w-full">
          <div className=" gap-5  font-medium text-[20px]  cursor-pointer   ">
            <div className="flex flex-col space-y-2">
              {support
                .sort((a, b) => b.sl - a.sl)
                .map((i, index) => (
                  <div
                    key={Math.random()}
                    onClick={() => setValue(index)}
                    className="pl-[30px] py-2 pr-[100px] bg-[#F3F3F6] hover:bg-[#E0EBFB] rounded-md hidden lg:block "
                  >
                    {i?.title}
                  </div>
                ))}
            </div>
            <li className="    rounded-md  block lg:hidden ">
              <div className="relative">
                {support
                  .sort((a, b) => b.sl - a.sl)
                  .map((i) => (
                    <Accordion
                      key={Math.random()}
                      sx={{
                        boxShadow: "none",
                        borderRadius: "none",
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="flex flex-col">{i.title}</div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="whitespace-pre-line text-[16px]">
                          {i?.details}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </div>
            </li>
          </div>
        </div>

        <div className="lg:w-[70%]  hidden lg:block ">
          <div className="grid gap-2">
            <div>
              <div className="bg-[#F3F3F6] w-full py-2 pl-8 font-medium text-[16px] whitespace-pre-line">
                {support?.[value]?.details}
                {/* <textarea
                  disabled
                  rows={15}
                  value={support?.[value]?.details}
                  key={Math.random()}
                  className="bg-[#F3F3F6] w-full py-2 pl-8 font-medium text-[16px]"
                >
                 
                </textarea> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
