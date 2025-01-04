import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      className=" w-full h-[50vh] text-wrap overflow-auto group " // Add group for hover effect
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path || data.poster_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className=" w-[30%] h-[50vh] group-hover:bg-black group-hover:bg-opacity-30 transition-all duration-600 delay-200" // Hover effect to change opacity
      >
        <div className=" text-white px-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-600 delay-200">
          {/* Hide content initially, show on hover */}
          <div>
            <h1 className="pt-3 text-3xl font-semibold text-[#9E39E8]">
              {data.name ||
                data.title ||
                data.original_name ||
                data.original_title}
              ({data.release_date.split("-")[0]})
            </h1>
            <p className="mt-3 w-full">
              {data.overview.slice(0, 90)} ...{" "}
              <Link
                to={`/${data.media_type}/details/${data.id}`}
                className="hover:text-blue-800 text-blue-400"
              >
                more
              </Link>
            </p>
            <div className="mt-3 w-full h-[12vh] px-2 pt-1 w-[50%] bg-black bg-opacity-50 rounded">
              <div className="mt-1 flex items-center">
                Type:
                <p className="px-7 text-sm text-green-400">{data.media_type}</p>
              </div>
              <div className="mt-1 flex items-center">
                Release :
                <p className="px-7 text-sm text-green-400">
                  {data.release_date || "No information"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to={`/${data.media_type}/details/${data.id}/trailer`}
              className=" bg-[#6556CD] px-3 py-2 rounded hover:bg-[#A405E8]"
            >
              Watch Trailer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
