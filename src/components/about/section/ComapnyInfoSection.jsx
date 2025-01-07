import { useGETPromoData } from "@/hooks/about.hooks";

const ComapnyInfoSection = () => {
  const { data, isLoading } = useGETPromoData();
  return (
    <div className="grid grid-cols-1 mx-2 lg:mx-0 gap-6 text-center py-8 lg:py-[50px] lg:grid-cols-2 xl:grid-cols-4">
      <div className="flex justify-center items-center bg-[#F3F3F6] rounded-2xl p-10 min-h-[176px] md:rounded-3xl xl:rounded-[40px] xl:min-h-fit xl:p-14">
        <p className="text-[22px] font-semibold">
          {isLoading
            ? "loadding..."
            : data?.first_card
            ? data?.first_card
            : "Since 1968"}
        </p>
      </div>

      <div className=" flex justify-center items-center bg-[#F3F3F6] rounded-2xl p-10 min-h-[176px] md:rounded-3xl xl:rounded-[40px] xl:min-h-fit xl:p-14">
        <p className="text-[22px] font-semibold">
          {isLoading
            ? "loadding..."
            : data?.second_card
            ? data?.second_card
            : "European Standard Manufacturing"}
        </p>
      </div>

      <div className=" flex justify-center items-center bg-[#F3F3F6] rounded-2xl p-10 min-h-[176px] md:rounded-3xl xl:rounded-[40px] xl:min-h-fit xl:p-14">
        <p className="text-[22px] font-semibold">
          {isLoading
            ? "loadding..."
            : data?.third_card
            ? data?.third_card
            : "Energy Efficiency Focus"}
        </p>
      </div>

      <div className=" flex justify-center items-center bg-[#F3F3F6] rounded-2xl p-10 min-h-[176px] md:rounded-3xl xl:rounded-[40px] xl:min-h-fit xl:p-14">
        <p className="text-[22px] font-semibold">
          {isLoading
            ? "loadding..."
            : data?.fourth_card
            ? data?.fourth_card
            : "Technologically Advanced Plant"}
        </p>
      </div>
    </div>
  );
};

export default ComapnyInfoSection;
