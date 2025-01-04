import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NotFound from "../NotFound";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  const navigate = useNavigate();

  return (
    <div className="bg-[rgba(0,0,0,.8)] z-[100] top-0 left-0 absolute w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute text-3xl right-[5%] text-white top-[5%] hover:text-[#6556CD] ri-close-line"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          controls
          height={540}
          width={960}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
