import Link from "next/link";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { RiFacebookCircleFill } from "react-icons/ri";
import Image from "next/legacy/image";

import googlePlay from "../@media/googlePlay.png";
import appStore from "../@media/appStore.png";
import LOGO from "../@media/Logo.png";

const SocialSection = () => {
  return (
    <div className="flex ">
      <div className=" font-semibold  mx-auto md:mx-0 ">
        <h1 className="mb-[14px] text-[18px]">Social Media</h1>

        <div className="flex gap-3 justify-center lg:flex lg:p-0 md:justify-start ">
          <Link
            href="https://www.facebook.com/ACCGlobalOfficial/"
            target="_blank"
            className="transition-all"
          >
            <RiFacebookCircleFill className="h-6 text-[24px]" />
          </Link>

          <Link
            href="https://www.instagram.com/accglobal_/"
            target="_blank"
            className="transition-all "
          >
            <AiFillInstagram className=" h-6 text-[24px]" />
          </Link>

          <Link
            href="https://www.youtube.com/@accglobalofficial"
            target="_blank"
            className="transition-all "
          >
            <AiFillYoutube className="h-6 text-[24px]" />
          </Link>

          <Link
            href="https://twitter.com/ACCGlobal_"
            target="_blank"
            className="transition-all "
          >
            <AiFillTwitterCircle className="h-6 text-[24px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// default footer
const LandingFooter = () => {
  let date = new Date().getFullYear();

  return (
    <div className="bg-[#F3F3F6] z-80  top-[100vh] py-[40px]  rounded-2xl mx-2 mb-[40px] md:rounded-3xl xl:rounded-[40px]">
      <footer className=" container mx-auto   py-1 text-center md:text-left text-[#102515] lg:py-[40px] 2xl:px-0">
        <div className="grid gap-[30px]  p-3 grid-cols-1 md:grid-cols-3  lg:px-[80px] xl:px-[120px] xl:grid-cols-4">
          <div className="mx-auto  ">
            <Image className="mb-[14px] mx-auto md:mx-0" src={LOGO} alt="" />
            <p className="mt-4">
              ACC is a globally recognized brand known for its exceptional
              quality and innovation in European standard electronic home
              appliances, delivering energy-efficient solutions since 1968.
            </p>
          </div>

          <div className="flex flex-col md:ml-5">
            <div className="">
              <div className=" flex flex-col items-center md:items-start">
                <span className="text-[18px] font-semibold mb-[14px] ">
                  About Us
                </span>
                <Link
                  href="/about"
                  className="link hover:underline w-fit mb-[14px]"
                >
                  About the Company
                </Link>
                <Link
                  href="/request-service"
                  className="hover:underline w-fit mb-[14px]"
                >
                  Request Service
                </Link>

                <Link
                  href="/privacy-policy"
                  className="hover:underline w-fit mb-[14px]"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start xl:hidden">
              <h1 className="mt-3 mb-[15px] text-[18px] font-semibold xl:mt-8">
                Connect Us
              </h1>
              <div className="flex gap-2">
                <p>dummyemail@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="hidden xl:block">
            <SocialSection />
            <h1 className="mt-5 mb-[15px] text-[18px] font-semibold xl:mt-8">
              Connect Us
            </h1>
            <div className="flex gap-2">
              <p>dummyemail@gmail.com</p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end ">
            <div className="">
              <div className="xl:hidden">
                <SocialSection />
              </div>
              <h1 className="mt-5 mb-[15px] text-[18px] font-semibold xl:mt-0">
                Our Apps
              </h1>
              <div className="flex gap-2">
                <Link href="https://play.google.com/store/apps/details?id=com.acc.home&pli=1">
                  <Image src={googlePlay} alt="" />
                </Link>
                <Link href="/">
                  <Image src={appStore} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="">
        <p className=" text-[#102515] text-center pb-[22px] border-[#102515] md:border-t md:pt-8 lg:mx-[100px]  lg:pt-[40px]">
          © Copyright {date}, All Rights Reserved by Walton ACC Bangladesh
        </p>
      </div>
    </div>
  );
};

export default LandingFooter;
