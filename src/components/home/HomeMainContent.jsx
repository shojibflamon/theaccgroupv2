import AboutUsSection from "../about/section/AboutUsSection";
import LatestUpdate from "../about/section/LatestUpdate";
import BannerSection from "./section/BannerSection";
import ProductSection from "./section/ProductSection";


const HomeMainContent = () => {
  return (
    <div className="container mx-auto   mt-2  lg:mt-10 lg:gap-3 xl:gap-8 ">
      <BannerSection />
      <ProductSection />
      <AboutUsSection />
      <LatestUpdate />
    </div>
  );
};

export default HomeMainContent;
