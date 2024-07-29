import { useState } from "react";
import ProductSlider from "../components/ProductSlider";
import StarRating from "../components/StarRating";
import DeliveryInfoTable from "../components/DeliveryInfoTable";
import ProductCard from "../components/ProductCard";

import samba3 from "../assets/samba/samba3.jpg";
import Footer from "../components/Footer";

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState({
    id: 1,
    name: "Adidas Samba (White)",
    price: 25500,
    size: "M",
    color: "Red",
  });
  // onChange function for add product to cart
  const onChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full flex flex-col ">
      <div className="max-width-3 flex flex-rows gap-12">
        {/* Product Image Slider */}
        <div className="w-3/5 h-2/3">
          <ProductSlider />
        </div>
        <div className="w-2/3 flex flex-col gap-2 pt-2">
          <h1 className="text-4xl font-bold">{selectedProduct.name}</h1>
          <div className="flex flex-row items-center gap-2">
            <p className="text-xl">
              Price: <span className="text-primary">{25500}TK</span>
            </p>
            <p className="text-md text-slate-400  line-through">
            30000TK
            </p>
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-primary px-3 text-sm text-white">
              {"27% off"}
            </span>
          </div>
          {/* Product Rating */}
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-bold">Rating:</p>
            <StarRating rating={3} />
          </div>
          {/* Product form to add to cart */}
          <form className="flex flex-col gap-5 py-3">
            {/* Product Size */}
            <div className="w-60">
              <div className="relative">
                <select
                  id="id-04"
                  name="id-04"
                  required
                  className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-primary focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value="" disabled selected></option>
                  <option value="1">Small</option>
                  <option value="2">Medium</option>
                  <option value="3">Large</option>
                  <option value="4">Extra Large</option>
                  <option value="5">Extra Extra Large</option>
                </select>
                <label className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Size
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-04 description-04"
                  role="graphics-symbol"
                >
                  <title id="title-04">Arrow Icon</title>
                  <desc id="description-04">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Product Color */}
            <div className="w-60">
              <div className="relative">
                <select
                  id="id-04"
                  name="id-04"
                  required
                  className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-primary focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value="" disabled selected></option>
                  <option value="1">Red</option>
                  <option value="2">Green</option>
                  <option value="3">Blue</option>
                  <option value="4">Yellow</option>
                  <option value="5">Orange</option>
                </select>
                <label className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                  Color
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-04 description-04"
                  role="graphics-symbol"
                >
                  <title id="title-04">Arrow Icon</title>
                  <desc id="description-04">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Add to Cart button */}
            <button className="w-60 h-10 rounded bg-primary text-white hover:bg-orange-700 focus:bg-orange-700">
              Add to Cart
            </button>
          </form>

          {/* Product Description */}
          <div>
            <p className="text-md font-bold">Product Description:</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              fugiat voluptatum consequatur earum eaque quasi veritatis, soluta
              ab, nihil dolore porro sint consectetur! Perferendis reprehenderit
              cum ipsa qui ipsam soluta?
            </p>
          </div>
          {/* Delivery Info table */}
          <DeliveryInfoTable />
        </div>
      </div>
      {/* Related Products */}
      <div className="w-full text-center my-10 ">
        <p className="text-3xl font-bold">Related Products</p>
        <div className="max-width-3 flex justify-center gap-10 mt-10">
          <ProductCard
            image={samba3}
            title={"Adidas Samba"}
            description={"Testing one two three four"}
            price={2500}
          />
          <ProductCard
            image={samba3}
            title={"Adidas Samba"}
            description={"Testing one two three four"}
            price={2500}
          />
          <ProductCard
            image={samba3}
            title={"Adidas Samba"}
            description={"Testing one two three four"}
            price={2500}
          />
          <ProductCard
            image={samba3}
            title={"Adidas Samba"}
            description={"Testing one two three four"}
            price={2500}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
