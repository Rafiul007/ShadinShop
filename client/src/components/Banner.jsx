import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-primary px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      ></div>
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      ></div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-gray-900">
          <strong className="font-semibold">Super Sale</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          Upto 25% Discount on every product.
        </p>
        <a
          href="/shop"
          className="flex-none rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-black shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Shop now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={() => setIsVisible(false)}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
        </button>
      </div>
    </div>
  );
}
