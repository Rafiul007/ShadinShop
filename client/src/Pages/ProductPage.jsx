import { useEffect, useState } from "react";
import ProductSlider from "../components/ProductSlider";
import DeliveryInfoTable from "../components/DeliveryInfoTable";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/products/productSlice";
import { addProduct } from "../features/cart/cartSlice";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");

  // Fetch product data from Redux store
  const { product, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const fetchedProduct = product?.data;

  if (status === "loading") {
    return <div>Loading product details...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!fetchedProduct) {
    return <div>Product Not Found</div>;
  }

  // Handle size options
  console.log("fetchedProduct size:", fetchedProduct?.size);
  const sizes = Array.isArray(fetchedProduct?.size) ? fetchedProduct.size : [];
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // Determine if the selected size is in stock
  const selectedSizeData = sizes.find((size) => size._id === selectedSize);
  const isSizeAvailable = selectedSizeData
    ? selectedSizeData.quantity > 0
    : false;

  const handleAddToCart = () => {
    const productToAdd = {
      id: fetchedProduct._id,
      name: fetchedProduct.name,
      price: fetchedProduct.price,
      quantity: 1, 
      size: selectedSizeData.size,
    };
    console.log("productToAdd:", productToAdd);
    //debound delay of 1sec
    setTimeout(() => {
      dispatch(addProduct(productToAdd));
    }, 500);

    setSelectedSize("");
  };

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
                {fetchedProduct.discountPrice
                  ? `${fetchedProduct.discountPrice}TK`
                  : `${fetchedProduct.price}TK`}
              </span>
            </p>
          </div>
          {/* Product form to add to cart */}
          <form className="flex flex-col gap-5 py-3">
            {/* Size select dropdown */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <label htmlFor="size" className="block text-md font-semibold">
                  Select Size:
                </label>
                <select
                  id="size"
                  name="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a size</option>
                  {sizes.map((size) => (
                    <option key={size._id} value={size._id}>
                      {size.size}
                      {size.quantity === 0 && selectedSize !== "" && (
                        <span className="text-red-500 text-sm ml-2">
                          (Out of Stock)
                        </span>
                      )}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Add to Cart button */}
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (selectedSize !== "" && isSizeAvailable) {
                  handleAddToCart();
                }
              }}
              className={`w-60 h-10 rounded ${
                selectedSize === ""
                  ? "bg-gray-300 cursor-not-allowed"
                  : isSizeAvailable
                  ? "bg-primary hover:bg-orange-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white`}
              disabled={selectedSize === "" || !isSizeAvailable}
            >
              {selectedSize === ""
                ? "Select a size"
                : isSizeAvailable
                ? "Add to Cart"
                : "Out of Stock"}
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
      {/* Related Products */}
      <div className="max-width-3 flex flex-col justify-center items-center border-2 border-blue-700">
        <h1 className="text-3xl font-bold">Related Products</h1>
        <div className="w-full grid grid-cols-4 gap-5 max-width">
          {Array.isArray(fetchedProduct.relatedProducts) &&
          fetchedProduct.relatedProducts.length > 0 ? (
            fetchedProduct.relatedProducts.map((product) => (
              <div key={product._id}>
                <ProductCard
                  image={product.images[0]}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  discountPrice={product.discountPrice}
                />
              </div>
            ))
          ) : (
            <p>No related products available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
