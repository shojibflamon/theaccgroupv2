"use client";
import Image from "next/legacy/image";
import AboutUSHome from "../@media/AboutHome.png";
import Link from "next/link";
import { useGETLAboutSection } from "@/hooks/about.hooks";

const AboutUsSection = () => {
  const { data, isLoading } = useGETLAboutSection();

  return (
    <div className="bg-[#F3F3F6] mx-2 text-center  px-4 py-10 my-[70px] lg:text-start lg:p-16 xl:my-[80px] xl:p-[92px] rounded-2xl md:rounded-3xl xl:rounded-[40px]">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="relative rounded-2xl w-full bg-white mx-auto md:max-w-[464px] lg:mx-0">
          <Image
            className="rounded-2xl"
            layout="responsive"
            src={isLoading ? AboutUSHome : data?.image || AboutUSHome}
            alt="about_image"
            priority
            width={464}
            height={363}
            objectFit="cover"
          />
        </div>
        {isLoading ? (
          "loading..."
        ) : (
          <div className="">
            <h1 className="text-[32px] capitalize lg:text-[56px] font-bold mt-4 text-center lg:text-left">
              {data?.title}
            </h1>

            <div
              className="py-[40px] text-[18px] lg:text-[22px]"
              dangerouslySetInnerHTML={{
                __html:
                  data?.about_details?.length > 0
                    ? data?.about_details.slice(0, 382) + "..."
                    : "<p>Not provided</p>",
              }}
            ></div>

            <Link
              href="/about"
              className=" bg-[#4852AE] py-[10px] px-[20px] text-white rounded-full"
            >
              Read More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsSection;
