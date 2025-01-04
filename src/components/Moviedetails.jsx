import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import no_img from "/no_img.jpg";

function Moviedetails() { 
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.poster_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[140vh] px-[10%]"
    >
      {/* part 1 of Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDB
        </a>
      </nav>
      {/* part 2 poster and Details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
          src={
            info.detail.backdrop_path || info.detail.poster_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.backdrop_path || info.detail.poster_path
                }`
              : no_img
          }
          alt=""
        />

        <div className="ml-[2%] content">
          <h1 className="text-4xl font-semibold text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-200">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <p className="mt-1 w-full text-justify text-zinc-300 text-m">
            {info.detail.overview.slice(0, 280)}
          </p>
          <div className="mt-2 space-between flex bg-zinc-100 rounded-md p-2">
            <div className="w-[50%] break-words">
              <h3 className="font-semibold mt-2">
                Genre:
                {info.detail.genres.map((m, i) => (
                  <small key={i} className="ml-1 text-[#B536E6] font-normal">
                    {m.name},
                  </small>
                ))}
              </h3>
              <h3 className="font-semibold mt-2">
                Release:{" "}
                <small className="font-normal">
                  {info.detail.release_date}
                </small>
              </h3>
              <h3 className="font-semibold mt-2">
                Country:
                {info.detail.origin_country.map((m, i) => (
                  <small key={i} className="ml-1 font-normal">
                    {m}
                  </small>
                ))}
              </h3>
            </div>
            <div className="break-words">
              <h3 className="font-semibold mt-2">
                Duration:
                <small className="ml-1 font-normal">
                  {info.detail.runtime} min
                </small>
              </h3>
              <h3 className="font-semibold mt-2">
                Language:
                {info.detail.spoken_languages.map((m, i) => (
                  <small key={i} className="ml-1 font-normal">
                    {m.english_name},
                  </small>
                ))}
              </h3>
              <h3 className="font-semibold mt-2">
                IMDB:
                <small className="ml-1 font-normal">
                  {info.detail.vote_average.toFixed(1)}
                </small>
                <span className="text-yellow-400">
                  <i className="ml-1 ri-star-fill"></i>
                </span>
              </h3>
              <div className="p-2 text-white">
                <Link
                  to={`${pathname}/trailer`}
                  className="px-3 py-1 bg-[#6556CD] hover:bg-[#B536E6] rounded-md"
                >
                  <i className="text-xl ri-play-fill"></i>
                  Play Trailer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      {/* part 3 recommendation and similar stuff */}
      <h1 className="mt-5 text-3xl hover:underline underline-offset-1 font-semibold text-white">
        Recommendations & Similar Items
      </h1>
      <HorizontalCards
        title="movie"
        data={
          info.recommendations.length > 0
            ? info.recommendations.results
            : info.similar.results
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default Moviedetails;
