import SingleProductContainer from "@/components/SingleProduct/SingleProductContainer";
import { getProductBySlug } from "@/views/productView";
import { notFound } from "next/navigation";

const ProductDetails = async ({ params }) => {
  try {
    const data = await getProductBySlug(params?.slug?.[1]);
    if(!data) {
      throw new Error("404")
    }
    return (
      <div>
        <SingleProductContainer data={data} isLoading={false} />
      </div>
    );
  } catch (error) {
    // console.log(error, 555)
    return notFound();
  }
};

export default ProductDetails;
