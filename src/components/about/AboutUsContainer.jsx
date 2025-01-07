'use client'
import AboutBanner from "./section/AboutBanner";
import ComapnyInfoSection from "./section/ComapnyInfoSection";
import LatestUpdate from "./section/LatestUpdate";

const AboutUsContainer = () => {
  return (
    <div className=" mx-2">
      <AboutBanner />
      <ComapnyInfoSection />

      <LatestUpdate />
    </div>
  );
};

export default AboutUsContainer;
