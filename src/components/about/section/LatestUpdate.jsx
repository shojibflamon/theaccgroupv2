import Link from "next/link";

import FACEBOOK from "../@media/icon/fb.png";
import INSTRA from "../@media/icon/insta.png";
import YT from "../@media/icon/yt.png";
import TWITER from "../@media/icon/twiter.png";
import Image from "next/legacy/image";

const LatestUpdate = () => {
  return (
    <div className="text-center bg-[#F3F3F6] mx-2  px-4 mt-[48px] p-8 mb-[40px] rounded-2xl lg:mb-[60px] lg:p-[90px] md:rounded-3xl xl:rounded-[40px] xl:px-[250px]">
      <h1 className="text-[32px] lg:text-[56px] font-bold">
        Follow Us for Updates!
      </h1>
      <p className="py-[35px]">
        Be sure to stay connected with us on our vibrant social media platforms,
        where we share regular updates, exclusive news, and engaging content.
        Join our online community and be the first to know about our exciting
        developments and upcoming releases!
      </p>
      <div className="flex justify-center px-10 space-x-5 md:space-x-8 lg:px-0">
        <Link
          href={"https://www.facebook.com/ACCGlobalOfficial/"}
          target="_blank"
          className="text-[#2F7CE3] text-6xl"
        >
          <Image src={FACEBOOK} alt="icon" />
        </Link>
        <Link
          href={"https://www.instagram.com/accglobal_/"}
          target="_blank"
          className="text-[#2F7CE3] text-6xl"
        >
          <Image src={INSTRA} alt="icon" />
        </Link>
        <Link
          href={"https://www.youtube.com/@accglobalofficial"}
          target="_blank"
          className="text-[#2F7CE3] text-6xl"
        >
          <Image src={YT} alt="icon" />
        </Link>
        <Link
          href={"https://twitter.com/ACCGlobal_"}
          target="_blank"
          className="text-[#2F7CE3] text-6xl"
        >
          <Image src={TWITER} alt="icon" />
        </Link>
      </div>
    </div>
  );
};

export default LatestUpdate;
