"use client";
import { useState } from "react";

import { Box, CircularProgress, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Cart from "@/components/core/card/Cart";
import {
  useGETFeaturedProduct,
  useGETProductCategory,
  useGetProduct,
} from "@/hooks/product.hook";
import { getFilterProducts } from "@/libs/filterProducts";

const ProductShowContainer = ({ products }) => {
  // console.log(products)
  return (
    <div className="mx-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:pt-10">
        {products.slice(0, 2).map((i) => (
          <Cart
            key={Math.random()}
            title={i?.title}
            subTitle={i?.model}
            url={`/product/${i?.category?.title
              .toLowerCase()
              .replace(/\s/g, "-")}/${i?.slug}`}
            image_url={i?.thumbnail}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 pt-10">
        {products.slice(2).map((i) => (
          <Cart
            key={Math.random()}
            title={i?.title}
            subTitle={i?.model}
            url={`/product/${i?.category?.title
              .toLowerCase()
              .replace(/\s/g, "-")}/${i?.slug}`}
            image_url={i?.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

const DisplayFeatureData = () => {
  const { data: featuredProducts, isLoading: isFetaureProdLoading } =
    useGETFeaturedProduct();
  return (
    <div>
      {isFetaureProdLoading ? (
        <div className="text-center flex justify-center h-44 items-center">
          <CircularProgress size={30} />
        </div>
      ) : featuredProducts?.length > 0 ? (
        <ProductShowContainer products={getFilterProducts(featuredProducts)} />
      ) : (
        <p className="text-center font-semibold text-lg py-5">
          No product available!
        </p>
      )}
    </div>
  );
};

const CategoryWiseData = ({ value }) => {
  const { data, isLoading } = useGetProduct(
    value !== "overview" ? { categoryId: value } : {}
  );
  return (
    <div>
      {isLoading ? (
        <div className="text-center flex justify-center h-44 items-center">
          <CircularProgress size={30} />
        </div>
      ) : data?.length > 0 ? (
        <ProductShowContainer products={data} />
      ) : (
        <p className="text-center font-semibold text-lg py-5">
          No product available!
        </p>
      )}
    </div>
  );
};

// for mobile view
const DisplayProductMobileView = ({ value }) => {
  const { data: featuredProducts, isLoading: isFetaureProdLoading } =
    useGETFeaturedProduct();
  const { data, isLoading } = useGetProduct(
    value !== "overview" ? { categoryId: value } : {}
  );

  return (
    <div>
      <div className=" mx-7 pt-5 md:mx-9">
        {value === "overview" ? (
          <div className="space-y-7">
            {isFetaureProdLoading ? (
              <div className="text-center flex justify-center h-44 items-center">
                <CircularProgress size={30} />
              </div>
            ) : featuredProducts?.length > 0 ? (
              getFilterProducts(featuredProducts).map((i) => {
                return (
                  <Cart
                    key={Math.random()}
                    title={i?.title}
                    subTitle={i?.model}
                    url={`/product/${i?.category?.title
                      .toLowerCase()
                      .replace(/\s/g, "-")}/${i?.slug}`}
                    image_url={i?.thumbnail}
                  />
                );
              })
            ) : (
              <p className="text-center font-semibold text-lg py-5">
                No product available!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-7">
            {isLoading ? (
              <div className="text-center flex justify-center h-44 items-center">
                <CircularProgress size={30} />
              </div>
            ) : data?.length > 0 ? (
              data?.map((i) => (
                <Cart
                  key={Math.random()}
                  title={i?.title}
                  subTitle={i?.model}
                  url={`/product/${i?.category?.title
                    .toLowerCase()
                    .replace(/\s/g, "-")}/${i?.slug}`}
                  image_url={i?.thumbnail}
                />
              ))
            ) : (
              <p className="text-center font-semibold text-lg py-5">
                No product available!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/** main component */
const ProductSection = () => {
  const [value, setValue] = useState("overview");
  const [tabValue, setTabValue] = useState("1");

  const { data: categoryData } = useGETProductCategory();
  // console.log(featuredProducts,isFetaureProdLoading,isLoading);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <h1 className="text-[32px] px-2 mt-10 md:px-0 md:text-[40px] lg:mt-0 lg:text-[56px] font-bold text-center">
        Shop our Latest Product
      </h1>

      <div className="  mt-[60px] hidden lg:block">
        <TabContext value={tabValue}>
          <div className="flex items-center justify-center text-center">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} variant="scrollable">
                <Tab
                  className="text-xl font-semibold text-black capitalize"
                  onClick={() => setValue("overview")}
                  label="Overview"
                  value={"1"}
                />
                {categoryData &&
                  categoryData?.map((i) => (
                    <Tab
                      className="text-xl min-w-fit font-semibold text-black capitalize"
                      onClick={() => setValue(i?.id)}
                      key={Math.random()}
                      label={i?.title}
                      value={i?.id}
                    />
                  ))}
              </TabList>
            </Box>
          </div>

          <div>
            {/* {(isLoading || isFetaureProdLoading) && (
              <div className="text-center flex justify-center h-44 items-center">
                <CircularProgress />
              </div>
            )} */}
            {value == "overview" ? (
              <div>
                <DisplayFeatureData />
              </div>
            ) : (
              <div>
                <CategoryWiseData value={value} />
              </div>
            )}
          </div>
        </TabContext>
      </div>

      {/* product show for mobile  */}
      <div className="mt-[10px] block lg:hidden">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} variant="scrollable">
              <Tab
                onClick={() => setValue("overview")}
                label="Overview"
                value={"1"}
              />
              {categoryData &&
                categoryData?.map((i) => (
                  <Tab
                    onClick={() => setValue(i?.id)}
                    key={Math.random()}
                    label={i?.title}
                    value={i?.id}
                  />
                ))}
            </TabList>
          </Box>
          <DisplayProductMobileView value={value} />
        </TabContext>
      </div>
    </div>
  );
};

export default ProductSection;
