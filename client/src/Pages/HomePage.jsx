import HeroSlider from "../components/HeroSlider";
import { IoIosList } from "react-icons/io";
import topCategories from '../assets/banner/topCategory';
import InfinitySlider from '../components/InfinitySlider';
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
      <section className='w-full overflow-hidden'>
        <InfinitySlider />
      </section>
      
    </div>
  );
}

export default HomePage;
