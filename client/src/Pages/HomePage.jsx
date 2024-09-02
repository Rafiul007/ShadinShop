import HeroSlider from "../components/HeroSlider";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { IoIosList } from "react-icons/io";
import topCategories from "../assets/banner/topCategory";
import InfinitySlider from "../components/InfinitySlider";
import ProductCard from "../components/ProductCard";
import banner from "../assets/banner/banner1.jpg";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productSlice";
function HomePage() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 9 }));
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  console.log(products);
  return (
    <div>
      <section className="max-width-2 flex justify-between gap-10 border-2 ">
        <div className="w-1/6">
          <ul className="flex flex-col gap-2">
            <li className="bg-primary p-1 border-2 rounded-s border-primary shadow-md flex items-center gap-2 text-white font-semibold">
              <IoIosList size={24} />
              Top Categories
            </li>
            {topCategories.map((item) => (
              <li
                key={item.id}
                className="p-2 rounded-s shadow-md hover:bg-tertiary"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-5/6">
          <HeroSlider />
        </div>
      </section>
      <section className="w-full overflow-hidden mb-16 mt-2">
        <InfinitySlider />
      </section>
      {/* Hot Deals */}
      <section className="w-full flex flex-col gap-10 mb-10">
        <div className="w-full h-1/2 bg-tertiary">
          <h1 className="text-center text-4xl text-primary font-bold py-10">
            Hot Deals
          </h1>
        </div>
        <div className="max-width flex justify-end">
          <a
            href="/category"
            className="text-primary text-xs hover:text-orange-500 ease-in-out hover:scale-110 duration-300"
          >
            See all<span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="w-full grid grid-cols-4 gap-5 max-width">
          <ProductCard
            image={banner}
            title={"Testing"}
            description={"Testing one two three four"}
            price={2500}
          />
          <ProductCard
            image={banner}
            title={"Testing"}
            description={"Testing one two three four"}
            price={2500}
          />
          <ProductCard
            image={banner}
            title={"Testing"}
            description={
              "Testing one two three four Testing one two three four Testing one two three four"
            }
            price={2500}
          />
          <ProductCard
            image={banner}
            title={"Testing"}
            description={"Testing one two three four"}
            price={2500}
          />
        </div>
      </section>
      {/* Newsletter */}
      <section className="w-full bg-tertiary p-10 my-10">
        <Newsletter />
      </section>
      {/* Products */}
      <section className="max-width-3 mb-10">
        <div className="grid grid-cols-4 grid-rows-2 gap-3">
          {/* show products. 1st product wil take col-span-2 */}
          {products.map((product) => (
            <div key={product._id} >
              <ProductCard
                image={product.images[1]}
                title={product.name}
                description={product.description}
                price={product.price}
                discountPrice={product.discountPrice}
              />
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
