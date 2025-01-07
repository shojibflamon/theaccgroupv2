'use client'
import React from "react";
import StoreData from "./sections/StoreData";
import StoreHeader from "./sections/StoreHeader";

const StoreContainer = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="pb-12 pt-8 lg:pt-12 lg:pb-[60px]">
        <StoreHeader />
      </div>
      <div className="pb-12 lg:pb-[60px]">
        <StoreData />
      </div>
    </div>
  );
};

export default StoreContainer;
