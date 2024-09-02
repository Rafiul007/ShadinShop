export default function ProductCard({
  image,
  title,
  description,
  price,
  discountPrice,
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-full h-100 duration-200 ease-in-out hover:scale-105">
      {/* Image */}
      <figure className="flex-shrink-0 w-full h-42 overflow-hidden">
        <img
          src={image}
          alt="card image"
          className="w-full h-full object-cover"
        />
      </figure>
      {/* Body */}
      <div className="flex flex-col p-6 flex-1">
        <header className="mb-4">
          <h3 className="text-xl font-medium text-slate-700 truncate">
            {title}
          </h3>
          <div className="flex flex-row gap-3">
            {discountPrice != price ? (
              <div className="flex flex-row gap-2">
                <p className="text-primary font-semibold">TK {discountPrice}</p>
                <p className="text-slate-400 line-through">TK {price}</p>
              </div>
            ) : (
              <p className="text-primary font-semibold">TK {price}</p>
            )}
          </div>
        </header>
        <p className="text-sm text-slate-500 line-clamp-2 flex-1">
          {description}
        </p>
      </div>
      {/* Action Button */}
      <div className="flex justify-end p-6 pt-0">
        <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-primary px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-orange-500 focus:bg-orange-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}
