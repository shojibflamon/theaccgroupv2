"use client";
import AboutDetails from "./AboutDetails";

import { useGETLAboutSection, useGETPromoData } from "@/hooks/about.hooks";
import PromoDataSection from "./PromoDataSection";
import { CircularProgress } from "@mui/material";

const AboutConatiner = () => {
  const { data, isLoading } = useGETLAboutSection();
  const { data: promoData, isLoading: promoIsLoading } = useGETPromoData();

  return (
    <div className="space-y-10">
      {isLoading ? (
        <div className="text-center flex justify-center h-44 items-center">
          <CircularProgress size={30} />
        </div>
      ) : (
        <AboutDetails instance={data} />
      )}
      {promoIsLoading ? (
        <div className="text-center flex justify-center h-44 items-center">
          <CircularProgress size={30} />
        </div>
      ) : (
        <PromoDataSection instance={promoData} />
      )}
    </div>
  );
};

export default AboutConatiner;
