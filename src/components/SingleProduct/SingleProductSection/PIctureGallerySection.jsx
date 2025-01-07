import Image from "next/legacy/image";
import { useState } from "react";

const PIctureGallerySection = ({ photoes }) => {
  const [value, setValue] = useState(0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mt-8 mx-2 mb-8 lg:mb-0 lg:mx-0 lg:ml-[160px] ">
      <div className="">
        <div className="relative bg-[white] border border-[#E4E4E4] p-[20px] lg:p-[57px] rounded-[30px]">
          <Image
            className="w-fit h-fit "
            layout="responsive"
            src={photoes[value]}
            alt="Product_image"
            priority
            width={500}
            height={400}
            objectFit="cover"
          />
        </div>
      </div>
        <div className="grid grid-cols-3 lg:grid-rows-3 lg:grid-flow-col gap-3">
          {photoes.map((i, idx) => (
            <div
              key={Math.random()}
              className={`${value == idx? 'border border-[#2F7CE3]':"border-[#E4E4E4]"} relative bg-[white] border  w-fit p-[17px] rounded-[10px]`}
              onClick={() => setValue(idx)}
            >
              <Image
                width={160}
                height={140}
                src={photoes[idx]}
                alt="iconImage"
                className=" rounded-[10px]"
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default PIctureGallerySection;
