import {
  useGETFeaturedProduct,
  usePostFeaturedProduct,
} from "@/hooks/product.hook";
import { FeaturedProductsStore } from "@/libs/store/feature.store";
import { CircularProgress } from "@mui/material";
import { Reorder } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

const FeaturedProductSection = () => {
  const { feateredProducts, setFeatureProduct } = FeaturedProductsStore();
  const { data, isLoading: isFeatureProdLoading } = useGETFeaturedProduct();

  const { mutateAsync, isLoading } = usePostFeaturedProduct();

  const handleFeaturePost = async () => {
    // if (feateredProducts?.length < 4) {
    //   return enqueueSnackbar("Add 4 product to feature!", { variant: "error" });
    // }
    const postData = feateredProducts.map((i) => {
      return { sl: i.sl, productId: i.id };
    });
    try {
      await mutateAsync(postData);
      enqueueSnackbar("Updated Feature Product.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Ivalid. Something wrong!", { variant: "error" });
    }
  };

  useEffect(() => {
    if (data && data.length > 0 && feateredProducts.length == 0) {
      const modifiedInstance = data.map((i) => {
        const data = i.product;
        data.sl = i.sl;
        return data;
      });
      setFeatureProduct(modifiedInstance);
    }
  }, [data, setFeatureProduct, feateredProducts]);

  // console.log(feateredProducts)
  
  return (
    <div className="bg-[#F3F3F6] p-4 lg:p-10 rounded-[20px]">
      <div className="flex items-center justify-between mb-5">
        <div className="text-[22px] lg:text-[36px] font-bold">
          Feature Product
        </div>
        <button
          onClick={handleFeaturePost}
          // loading={true}
          disabled={isLoading}
          type="submit"
          className="btn bg-[#2F7CE3] text-white px-4 lg:px-7 py-[10px] capitalize mt-[50px]  ml-[22px] rounded-[10px] disabled:bg-slate-400"
        >
          {isLoading ? "Saving..." : "Publish"}
        </button>
      </div>

      {isFeatureProdLoading ? (
        <div className="flex items-center justify-center h-44">
          <CircularProgress />
        </div>
      ) : feateredProducts?.length > 0 ? (
        <div>
          <Reorder.Group
            axis="x"
            values={feateredProducts}
            onReorder={setFeatureProduct}
          >
            <div className="flex overflow-x-auto pb-5 gap-5 items-center">
              {feateredProducts?.map((i, idx) => (
                <Reorder.Item key={i.id} value={i}>
                  <div className="bg-white rounded-xl w-fit p-2 xl:p-4 2xl:p-6">
                    <div
                      className=" relative bg-slate-200 rounded-xl bg-no-repeat bg-cover bg-center w-20 h-20 xl:w-24 xl:h-24 2xl:w-[128px] 2xl:h-[128px]"
                      style={{ backgroundImage: `url(${i?.thumbnail})`}}
                    >
                      <span
                        className="cursor-pointer bg-white text-[#BD2626] border border-[#BD2626] px-2 rounded-full absolute right-[-3px] top-0"
                        onClick={() => {
                          feateredProducts.splice(idx, 1);
                          setFeatureProduct(feateredProducts);
                        }}
                      >
                        x
                      </span>
                    </div>
                    <p className="text-sm font-semibold mt-4 text-center">
                      {i.title}
                    </p>
                  </div>
                </Reorder.Item>
              ))}
            </div>
          </Reorder.Group>
        </div>
      ) : (
        <p className="text-center h-44">No product added to feature.</p>
      )}
    </div>
  );
};

export default FeaturedProductSection;
