const Searchbar = () => {
  return (
    <div className="w-full max-w-sm">
      <label className="sr-only" htmlFor="overview-search">
        Search
      </label>
      <div className="relative">
        {/* Search Icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#808B99]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>

        <input
          id="overview-search"
          placeholder="Search devices, customers, locations..."
          className="w-full rounded-sm border border-[#808B99] bg-white pl-10 pr-3 py-2 text-sm outline-none transition-colors focus:border-slate-400"
        />
      </div>
    </div>
  );
}

export default Searchbar;