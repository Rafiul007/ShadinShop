function Newsletter() {
  return (
      <div className="max-width flex justify-between items-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl text-primary font-bold">Newsletter</h1>
        <p>Get exciting offers, promotions and news on you email</p>
      </div>
      <div className="flex gap-10 items-center ml-10">
          <div className="flex items-center gap-2 bg-white rounded shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Enter your email"
              className="px-4 py-2 focus:outline-none"
            />
            <button className="px-4 py-2 bg-primary  text-tertiary hover:bg-orange-600">
            Subscribe
            </button>
          </div>
        </div>
    </div>
  )
}

export default Newsletter