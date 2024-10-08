import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import banner from "../assets/banner/banner";

export default function HeroSlider() {
  useEffect(() => {
    const slider = new Glide(".glide-06", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 0,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
      <div className="relative w-full overflow-hidden bg-white rounded shadow-xl glide-06 shadow-slate-200">
        <div className="overflow-hidden w-full" data-glide-el="track">
          <ul className="w-full h-full whitespace-no-wrap flex-no-wrap relative flex p-0">
            {banner.map((item) => (
              <li key={item.id} className="w-full flex-1">
                <img
                  src={item.img}
                  alt="banner"
                  className="w-full "
                  style={{ height: "40rem" }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className="absolute left-0 flex items-center justify-between w-full px-4 top-1/2"
          data-glide-el="controls"
        >
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center w-full gap-2" data-glide-el="controls[nav]">
          {banner.map((_, index) => (
            <button
              key={index}
              className="p-4 group"
              data-glide-dir={`=${index}`}
              aria-label={`goto slide ${index + 1}`}
            >
              <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
