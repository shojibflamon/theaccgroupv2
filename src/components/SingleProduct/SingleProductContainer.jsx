"use client";
import Image from "next/legacy/image";
import { useState } from "react";
import FeaturesSection from "./SingleProductSection/FeaturesSection";
import TechnicalSpecificationSection from "./SingleProductSection/TechnicalSpecificationSection";
import PIctureGallerySection from "./SingleProductSection/PIctureGallerySection";
import SupportSection from "./SingleProductSection/SupportSection";
import { CircularProgress, Tab, Tabs } from "@mui/material";

const HeroSection = ({ productInfo }) => {
  return (
    <div className="flex flex-col lg:items-center lg:flex-row  lg:gap-[50px] mx-2 lg:mx-0">
      <div className="lg:w-[50%]">
        <div className="relative bg-[white] border border-[#E4E4E4] px-10 lg:py-[70px] lg:px-[80px] rounded-[20px]">
          <Image
            className="w-full"
            layout="responsive"
            src={productInfo?.thumbnail}
            alt="Product_image"
            priority
            width={500}
            height={400}
            objectFit="cover"
          />
        </div>
      </div>
      <div className=" items-center text-center mt-5 lg:mt-0 lg:text-start lg:w-[50%]">
        <h1 className="text-[32px] text-center font-bold lg:text-[42px] lg:text-left ">
          {productInfo?.title}
        </h1>
        <p className=" text-[#2F7CE3] font-semibold mt-3 lg:mt-7 xl:text-lg">
          {productInfo.model}
        </p>
        <p className="whitespace-pre-line mt-3 mb-5 md:mb-6 lg:mt-7 xl:mb-12">
          {productInfo?.deccription}
        </p>

        <div className="">
          <p className="font-bold text-[32px] lg:text-[56px] text-[#2F7CE3]">
            Tk {productInfo?.price}
          </p>
        </div>

        {/* color */}
        {productInfo?.ProductColor?.length > 0 && (
          <div className=" gap-8 mt-5 xl:mt-[30px]">
            <div className="flex gap-5 justify-center flex-wrap lg:justify-start">
              {productInfo?.ProductColor?.map((i) => {
                // console.log(i)
                return (
                  <div
                    key={Math.random()}
                    className={`border w-fit  rounded-xl flex flex-col justify-center items-center gap-2 p-2 md:p-4 xl:gap-4 xl:p-6 xl:rounded-2xl`}
                  >
                    <p
                      style={{
                        backgroundColor: i?.color.hax_code,
                      }}
                      className={` border rounded-full w-4 h-4 lg:w-5 lg:h-5`}
                    >
                      {/* <CircleIcon className={`text-[${i.hex}] `} /> */}
                    </p>
                    <p>{i?.color.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailsSection = ({ productInfo }) => {
  const [value, setValue] = useState(0); // pc

  return (
    <div>
      <div className=" mt-[30px] lg:mt-[40px]  lg:mb-[40px] ">
        <h1 className="text-[32px] md:text-[40px] lg:text-[56px] font-bold text-center md:mb-6 lg:text-left ">
          More Details
        </h1>
        <div className="hidden  lg:block">
          <ul className="flex flex-col lg:flex-row gap-12  font-semibold text-[22px] text-center cursor-pointer ">
            <li
              className={`${value == 0 && "overviewline text-[#2F7CE3]"}`}
              onClick={() => setValue(0)}
            >
              Feature
            </li>
            <li
              className={`${value == 1 && "overviewline text-[#2F7CE3]"}`}
              onClick={() => setValue(1)}
            >
              Technical Specification
            </li>
            <li
              className={`${value == 2 && "overviewline text-[#2F7CE3]"}`}
              onClick={() => setValue(2)}
            >
              Picture Gallery
            </li>
            <li
              className={`${value == 3 && "overviewline text-[#2F7CE3]"}`}
              onClick={() => setValue(3)}
            >
              Supports
            </li>
          </ul>
          <div>
            {value == 0 && (
              <FeaturesSection featureList={productInfo?.features} />
            )}
            {value == 1 && (
              <TechnicalSpecificationSection
                technicalSpecification={productInfo.technical_specification}
              />
            )}
            {value == 2 && (
              <PIctureGallerySection photoes={productInfo.images} />
            )}
            {value == 3 && <SupportSection support={productInfo.supports} />}
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Features" />
          <Tab label="Technical Specification" />
          <Tab label="PIcture Gallery" />
          <Tab label="Support" />
        </Tabs>
        <div>
          {value == 0 && <FeaturesSection featureList={productInfo.features} />}
          {value == 1 && (
            <TechnicalSpecificationSection
              technicalSpecification={productInfo.technical_specification}
            />
          )}
          {value == 2 && <PIctureGallerySection photoes={productInfo.images} />}
          {value == 3 && <SupportSection support={productInfo.supports} />}
        </div>
      </div>
    </div>
  );
};

const SingleProductContainer = ({ data, isLoading }) => {
  // console.log(data)
  return (
    <div>
      {isLoading && (
        <div className="text-center flex items-center justify-center h-44 md:h-60">
          <CircularProgress />
        </div>
      )}
      {data && <HeroSection productInfo={data} />}
      {data && <DetailsSection productInfo={data} />}
    </div>
  );
};

export default SingleProductContainer;
