import Link from "next/link";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Image from "next/legacy/image";

const Cart = ({ title, subTitle, url, image_url }) => {
  return (
    <div className="h-full">
      <div className="bg-[#F3F3F6] h-full -mx-4 lg:-mx-0  py-10 text-center px-6 xl:px-[64px] xl:py-12 rounded-3xl xl:rounded-[40px]">
        <h1 className="text-[24px] lg:text-[36px] font-bold">{title}</h1>
        <p className="py-[16px]">{subTitle}</p>
        <Link href={url} className=" text-[#2F7CE3] pb-4 inline-block">
          View Details <KeyboardArrowRightOutlinedIcon className="-mt-[2px]" />
        </Link>
        {/* <div className="flex justify-center pt-8 pb-16"> */}
        <div className="relative rounded-2xl bg-white max-w-[314px] mx-auto">
          <Image
            className="rounded-2xl bg-white"
            layout="responsive"
            src={image_url}
            alt="Product_image"
            priority
            width={348}
            height={348}
            objectFit="cover"
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Cart;
