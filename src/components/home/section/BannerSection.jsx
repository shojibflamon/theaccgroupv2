"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { AiOutlineRight } from "react-icons/ai";

import Image from "next/legacy/image";
import banner from "../@media/banner.png";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useGETLandingHeroSection } from "@/hooks/landing.hooks";

export default function BannerSection() {
  SwiperCore.use([Autoplay]);

  const { data, isLoading } = useGETLandingHeroSection();
  const { push } = useRouter();
  return (
    <div className="mb-[30px] px-4 md:px-0 lg:mb-[60px]">
      {isLoading && (
        <div className="h-44 flex justify-center items-center lg:h-60">
          <CircularProgress />
        </div>
      )}
      {!isLoading &&
        (data?.thumbnail?.length > 0 ? (
          <Swiper
            style={{
              "--swiper-pagination-color": "#4852AE",
              "--swiper-pagination-bullet-inactive-color": "white",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "15px",
            }}
            slidesPerView={1}
            spaceBetween={5}
            loop={true}
            autoplay={{
              delay: 2500,
              // disableOnInteraction: false,
              // pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              disabledClass: "disabled_swiper_button",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {data?.thumbnail?.map((i) => (
              <SwiperSlide key={Math.random()}>
                <div
                  onClick={() => push(i?.media_url ? i.media_url : "#")}
                  className="relative cursor-pointer"
                >
                  <Image
                    className="w-full rounded-2xl md:rounded-3xl xl:rounded-[50px]"
                    src={i.url}
                    width={1252}
                    height={545}
                    layout="responsive"
                    objectFit="cover"
                    alt="banner_image"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="">
            <Image
              className="w-full"
              src={banner}
              layout="responsive"
              alt="banner_image"
              priority
            />
          </div>
        ))}
    </div>
  );
}
