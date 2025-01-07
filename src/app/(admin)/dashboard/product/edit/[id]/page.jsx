import ProductEditContainer from "@/components/dashboard/product/ProductEditContainer";
import { getProductByID } from "@/views/productView";
import { notFound } from "next/navigation";

const EditProduct = async ({ params }) => {
  try {
    const data = await getProductByID(params.id);
    return (
      <div>
        <ProductEditContainer instance={data} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
};

export default EditProduct;
