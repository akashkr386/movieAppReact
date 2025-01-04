import React from "react";
import { Link } from "react-router-dom";
import no_img from "/no_img.jpg";

function Card({ data, title }) {
  return (
    <div className="px-[5%] flex flex-wrap w-full bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[25vh] mr-[3%] mb-[3%]"
          key={i}
        > 
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={
              c.backdrop_path || c.profile_path || c.poster_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.backdrop_path || c.profile_path || c.poster_path
                  }`
                : no_img
            }
            alt=""
          />

          <h1 className="text-xl text-zinc-400 mt-3 font-semibold">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average ? (
            <div className="flex text-white">
              IMDB-
              <div className="ml-2 text-yellow-400">
                {c.vote_average.toFixed(1)} <i className="ri-star-fill"></i>
              </div>
            </div>
          ) : (
            <h6></h6>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Card;
