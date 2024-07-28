import ProductSlider from "../components/ProductSlider";
import StarRating from "../components/StarRating";
function ProductPage() {
  return (
    <div className="max-width-3 flex flex-rows gap-12">
      {/* Product Image Slider */}
      <div className="w-3/5 h-2/3">
        <ProductSlider />
      </div>
      <div className="w-2/3 flex flex-col gap-2 pt-2">
        <h1 className="text-4xl">Product name</h1>
        <p className="text-2xl">Price: {5222}TK</p>
        {/* Product Rating */}
        <p>Rating</p>
        <StarRating rating={3}/>
        {/* Product Quantity */}
        <p>Quantity: 1</p>

        {/* Product Size */}
        <p>Size: M</p>
        {/* Product Color */}
        <p>Color: Red</p>
        {/* Product Description */}
        <p>
          Description Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aut fugiat voluptatum consequatur earum eaque quasi veritatis, soluta
          ab, nihil dolore porro sint consectetur! Perferendis reprehenderit cum
          ipsa qui ipsam soluta?
        </p>
      </div>
    </div>
  );
}

export default ProductPage;
