import HeroSlider from "../components/HeroSlider";
import { IoIosList } from "react-icons/io";
import topCategories from '../assets/banner/topCategory';
import InfinitySlider from '../components/InfinitySlider';
import ProductCard from '../components/ProductCard';
import banner from "../assets/banner/banner1.jpg";
function HomePage() {
  return (
    <div>
      <section className="max-width-2 flex justify-between gap-10 border-2 ">
        <div className="w-1/6">
          <ul className="flex flex-col gap-2">
            <li className="bg-primary p-1 border-2 rounded-lg border-primary shadow-md flex items-center gap-2">
              <IoIosList size={24} />Top Categories
            </li>
            {topCategories.map((item) => (
              <li key={item.id} className="p-2 rounded-lg shadow-md hover:bg-tertiary">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-5/6">
          <HeroSlider />
        </div>
      </section>
      <section className='w-full overflow-hidden mb-16 mt-2'>
        <InfinitySlider />
      </section>
      <section className="w-full flex flex-col gap-10 mb-10">
        <div className="w-full h-1/2 bg-tertiary">
          <h1 className="text-center text-4xl text-primary font-bold py-10">Hot Deals</h1>
        </div>
        <div className="w-full grid grid-cols-4 gap-5 max-width">
          <ProductCard image={banner} title={"Testing"} description={"Testing one two three four"} price={2500}/>
          <ProductCard image={banner} title={"Testing"} description={"Testing one two three four"} price={2500}/>
          <ProductCard image={banner} title={"Testing"} description={"Testing one two three four Testing one two three four Testing one two three four"} price={2500}/>
          <ProductCard image={banner} title={"Testing"} description={"Testing one two three four"} price={2500}/>

        </div>
      </section>
    </div>
  );
}

export default HomePage;
