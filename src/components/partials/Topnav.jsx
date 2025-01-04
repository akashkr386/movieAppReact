import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import no_img from "/no_img.jpg";

function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="text-zinc-400 text-3xl ri-search-line cursor-pointer"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] rounded-xl text-black mx-10 p-5 text-xl px-3 py-2 outline-none border-1 bg-transparet"
        type="text"
        placeholder="Search..."
      />
      {query.length > 0 && (
        <i
          className="text-zinc-400 text-3xl ri-close-fill cursor-pointer right-0"
          onClick={() => setquery("")}
        ></i>
      )}
      
      <div className="z-[100] absolute w-[50%] rounded max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
      
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-100 "
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path || s.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path || s.poster_path
                    }`
                  : no_img
              }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
