import { useEffect } from "react";
import ProductSlider from "../components/ProductSlider";
import DeliveryInfoTable from "../components/DeliveryInfoTable";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/products/productSlice";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch product data from Redux store
  const { product, status, error } = useSelector((state) => state.products);

  // Fetch product by ID when the component mounts or when the ID changes
  useEffect(() => {
    console.log("Effect triggered");
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const fetchedProduct = product?.data;
  console.log("fetchedProduct: ", fetchedProduct);

  if (status === "loading") {
    return <div>Loading product details...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product Not Found</div>;
  }

  // Determine if there's a discount and calculate the necessary values
  const isDiscounted = fetchedProduct?.discount !== null;
  const originalPrice = fetchedProduct?.price;
  const discountPrice = fetchedProduct?.discountPrice;
  const discountType = fetchedProduct?.discount?.type;
  const discountValue = fetchedProduct?.discount?.value;

  return (
    <div className="w-full flex flex-col">
      <div className="max-width-3 flex flex-rows gap-12">
        {/* Product Image Slider */}
        <div className="w-3/5 h-2/3">
          {fetchedProduct?.images && (
            <ProductSlider images={fetchedProduct?.images} />
          )}
        </div>
        <div className="w-2/3 flex flex-col gap-2 pt-2">
          <h1 className="text-4xl font-bold">{fetchedProduct?.name}</h1>
          <div className="flex flex-row items-center gap-2">
            <p className="text-xl">
              Price:{" "}
              <span className="text-primary">
                {isDiscounted ? `${discountPrice}TK` : `${originalPrice}TK`}
              </span>
            </p>
            {/* Show discount and original price if applicable */}
            {isDiscounted && (
              <>
                <p className="text-md text-slate-400 line-through">
                  {originalPrice}TK
                </p>
                {discountType === "percentage" && (
                  <span className="inline-flex items-center justify-center gap-1 rounded-full bg-primary px-3 text-sm text-white">
                    {`${discountValue}% off`}
                  </span>
                )}
              </>
            )}
          </div>
          {/* Product form to add to cart */}
          <form className="flex flex-col gap-5 py-3">
            {/* Add to Cart button */}
            <button className="w-60 h-10 rounded bg-primary text-white hover:bg-orange-700">
              Add to Cart
            </button>
          </form>
          {/* Product Description */}
          <div>
            <p className="text-md font-bold">Product Description:</p>
            <p>{fetchedProduct?.description}</p>
          </div>
          {/* Delivery Info table */}
          <DeliveryInfoTable />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
