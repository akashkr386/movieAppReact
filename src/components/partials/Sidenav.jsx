import React from "react";
import { Link } from "react-router-dom";

function Sidenav() {



  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-8">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className="text-2xl">MovieDB.</span>
      </h1>

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-6 mb-3">
          New Feeds
        </h1>
        <Link to="/trending" className="px-3 py-2 hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4">
          <i className="mr-1 ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="px-3 py-2 hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4">
          <i className="mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="px-3 py-2 hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4">
          <i className="mr-2 ri-film-fill"></i> Movies
        </Link>
        <Link to="/tv" className="px-3 py-2 hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4">
          <i className="mr-2 ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link to="/person" className="px-3 py-2 mb-3 hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4">
          <i className="mr-2 ri-team-fill"></i> People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-6 mb-3">
          Website Information
        </h1>
        <Link to="/about" className="px-3 py-2 hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4">
          <i className="mr-2 ri-information-fill"></i> About
        </Link>
        <Link to="/contact" className="px-3 py-2 hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4">
          <i className="mr-2 ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
