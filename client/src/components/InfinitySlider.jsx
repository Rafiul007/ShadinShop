import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import slides from "../assets/banner/slides"; // Adjust the path as needed
import { CiMedal, CiWallet, CiDeliveryTruck, CiDiscount1, CiPhone } from "react-icons/ci";

export default function CarouselLogo() {
  useEffect(() => {
    const slider = new Glide(".glide-09", {
      type: "carousel",
      autoplay: 1,
      animationDuration: 4500,
      animationTimingFunc: "linear",
      perView: 3,
      breakpoints: {
        1024: { perView: 2 },
        640: { perView: 1, gap: 36 },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <div className="glide-09 relative w-full">
      <div data-glide-el="track" className="glide__track">
        <ul className="whitespace-no-wrap flex-no-wrap relative flex w-full overflow-hidden p-0">
          {slides.map((item) => (
            <li key={item.id} className="w-full">
              <p className="flex gap-3 items-center justify-center text-xl ">{<item.icon size={50} />} {item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
