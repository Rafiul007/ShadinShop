import React, { useEffect, useState, useRef } from "react";
import Glide from "@glidejs/glide";

export default function SliderControlsInside({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const glideRef = useRef(null);

  useEffect(() => {
    if (imagesLoaded) {
      glideRef.current = new Glide(".glide-01", {
        type: "slider",
        focusAt: "center",
        perView: 1,
        autoplay: 5000,
        animationDuration: 700,
        gap: 0,
      }).mount();

      // Bind event to update the selectedIndex state when the slide changes
      glideRef.current.on("move.after", () => {
        setSelectedIndex(glideRef.current.index);
      });

      return () => {
        glideRef.current.destroy();
      };
    }
  }, [imagesLoaded, images]);

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    glideRef.current.go(`=${index}`);
  };

  const handleImageLoad = () => {
    const allImages = document.querySelectorAll(".glide-01 img");
    const loadedImages = Array.from(allImages).filter((img) => img.complete);
    if (loadedImages.length === images.length) {
      setImagesLoaded(true);
    }
  };

  return (
    <div className="w-full h-full">
      {/*<!-- Component: Slider with controls inside --> */}
      <div className="relative w-full glide-01">
        {/* Slides */}
        <div className="overflow-hidden max-w-fit w-full" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex flex-row justify-center items-center w-full h-full overflow-hidden p-0">
            {images.map((image, index) => (
              <li key={index} className="w-full flex-1">
                <img
                  src={image}
                  className="w-full max-w-full max-h-full m-auto"
                  alt={`Slide ${index + 1}`}
                  onLoad={handleImageLoad}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Controls */}
        <div
          className="absolute left-0 flex items-center justify-between w-full h-0 px-4 top-1/2"
          data-glide-el="controls"
        >
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12 hover:shadow-lg hover:scale-110 transform-gpu"
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
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12 hover:shadow-lg hover:scale-110 transform-gpu"
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
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 space-x-2 justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer p-1 border ${
              selectedIndex === index ? "border-gray-400" : "border-transparent"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              className="w-16 h-16 object-cover"
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
