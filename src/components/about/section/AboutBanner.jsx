import { useGETLAboutSection } from "@/hooks/about.hooks";
import { useState } from "react";

const AboutBanner = () => {
  const [text, setText] = useState(348);
  const { data, isLoading } = useGETLAboutSection();
  return (
    <div className="text-center bg-[#F3F3F6] mx-2 px-4  rounded-2xl mt-[20px] p-8 md:rounded-3xl lg:p-[60px] lg:mx-0 xl:rounded-[40px]  xl:px-[250px]">
      <h1 className="text-[32px] lg:text-[56px] font-extrabold">About Us</h1>
      <div className="py-[35px] container-box">
        {/* about_details */}
        {isLoading ? (
          "loading..."
        ) : (
          <div className="">
            <div
              className="text-xl"
              dangerouslySetInnerHTML={{
                __html:
                  data?.about_details?.length > 0
                    ? data.about_details.slice(0, text)
                    : "<p>Not provided</p>",
              }}
            ></div>
            {text == 348 && data?.about_details?.length > 384 && (
              <span
                className="text-[#2F7CE3] cursor-pointer"
                onClick={() => setText(data?.about_details?.length)}
              >
                ... Read more
              </span>
            )}
            {text == data?.about_details?.length &&
              data?.about_details?.length > 11 && (
                <span
                  className="text-[#2F7CE3] cursor-pointer"
                  onClick={() => setText(348)}
                >
                  Less
                </span>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutBanner;

const TEXT_CONTECT = `We are a globally recognized and esteemed brand that has been
delivering exceptional quality products since 1968. With a strong
foothold in Europe, ACC has become a household name, trusted by
customers across the continent.Last year, Walton Hi-Tech Industries
PLC achieved a significant milestone by securing the rights of three
prominent European brands: ACC, Zanussi Elettromeccanica (ZEM), and
Verdichter (VOE). This achievement came after surpassing fierce
competition in an international bidding process. The acquisition
included the trademark and brand presence in 57 countries, as well as
all R&D intellectual properties, such as patents, design, and software
licenses. Additionally, a state-of-the-art, fully automated inverter
and non-inverter compatible compressor plant became part of the
portfolio. Founded in 1968 in the Belluno area of Italy, ACC has built
a rich history and established itself as a leader in household
compressor production. The brand has now joined forces with Walton
Hi-Tech Industries PLC, expanding its capabilities and resources to
further excel in the market. With a strong focus on energy efficiency,
ACC aims to produce electronic home appliances that not only meet the
highest European standards but also contribute to the 100 percent
electrification of our country. Our manufacturing plant stands as a
testament to this commitment, being the first fully automated inverter
compressor manufacturing facility in the subcontinent. At ACC, we take
pride in manufacturing a diverse range of energy-efficient electronic
home appliances. From European standard refrigerators and air
conditioners to televisions, washing machines, fans, ovens, and other
electronic devices, we strive to bring you products that enhance your
everyday life while reducing energy consumption. We are thrilled to
embark on this new chapter with you, and we invite you to explore our
wide range of products that combine innovation, reliability, and
sustainability. Join us on this exciting journey as we continue to
revolutionize the electronic appliance industry and bring greater
convenience to homes around the world.`;
