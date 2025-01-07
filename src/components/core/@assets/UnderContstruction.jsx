import Image from "next/image";
import React from "react";

const UnderContstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 container mx-auto">
     <div className="mb-5  xl:mb-12">
     <h1 className="text-[#2F7CE3] max-w-[667px] text-center text-3xl font-bold md:text-4xl xl:text-[56px] xl:font-extrabold">
        THIS PAGE IS UNDER
      </h1>
      <h1 className="text-[#2F7CE3] max-w-[667px] text-center text-3xl mt-3 font-bold md:text-4xl xl:text-[56px] xl:mt-4 xl:font-extrabold">
        CONSTRUCTION
      </h1>
     </div>
      <div className="relative">
        <Image
          src={`/img/under_cons.png`}
          width={705}
          height={444}
          alt="dummy_img"
        />
      </div>
    </div>
  );
};

export default UnderContstruction;
