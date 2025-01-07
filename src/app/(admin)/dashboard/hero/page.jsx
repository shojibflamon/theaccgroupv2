"use client";
import React from "react";
import AddHeroImageContainer from "../../../../components/dashboard/hero/AddHeroImageContainer";
import { useGETLandingHeroSection } from "@/hooks/landing.hooks";
import { CircularProgress } from "@mui/material";

const LandingHeroSectionManagement = () => {
  const { data, isLoading } = useGETLandingHeroSection();
  return (
    <div>
      <div className="bg-[#F3F3F6] w-full rounded-[20px] p-[20px] lg:p-[35px]">
        <h1 className="font-bold text-[24px] lg:text-[36px]">Add Image</h1>
        <p className="border-b-2 pb-[20px]">
          Image should be PNG and maximum size 1 Mb
        </p>
        <p className="text-sm">
          Image Dimension: <span className="text-[#2F7CE3]">1252px 545px</span>
        </p>

        {/* Add Image Section */}

        {isLoading ? (
          <div className="text-center flex justify-center h-44 items-center">
            <CircularProgress size={30} />
          </div>
        ) : (
          <AddHeroImageContainer instance={data} />
        )}

        {/* Show Preview */}
      </div>
    </div>
  );
};

export default LandingHeroSectionManagement;
