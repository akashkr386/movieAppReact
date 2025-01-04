import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import no_img from "/no_img.jpg";
import Dropdown from "../components/partials/Dropdown";

function Persondetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  const { pathname } = useLocation();

  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] w-screen flex flex-col h-[180vh] bg-[#1F1E24]">
      {/* part 1 of Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* part 2 left poster and detail */}
        <div className="w-[20%] ">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={
              info.detail.profile_path || info.detail.poster_path
                ? `https://image.tmdb.org/t/p/original/${
                    info.detail.profile_path || info.detail.poster_path
                  }`
                : no_img
            }
            alt=""
          />
          <hr className="mt-10 mb-5 w-[70%] border-none h-[2px] bg-zinc-500" />
          {/* Social media Links */}
          <div className="text-xl text-white flex gap-x-5">
            <a
              className="hover:scale-125"
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              className="hover:scale-125"
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              className="hover:scale-125"
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              className="hover:scale-125"
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal information */}
          <h1 className="text-2xl text-zinc-200 font-semibold my-5 hover:underline underline-offset-1">
            Personal Info
          </h1>
          <h1 className="text-lg text-zinc-300 font-semibold">Known For</h1>
          <h1 className="text-zinc-400 font-semibold">
            {info.detail.known_for_department}
          </h1>
          <h1 className="mt-3 text-lg text-zinc-300 font-semibold">Gender</h1>
          <h1 className="text-zinc-400 font-semibold">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="mt-3 text-lg text-zinc-300 font-semibold">Birthday</h1>
          <h1 className="text-zinc-400 font-semibold">
            {info.detail.birthday}
          </h1>
          <h1 className="mt-3 text-lg text-zinc-300 font-semibold">Deathday</h1>
          <h1 className="text-zinc-400 font-semibold">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="mt-3 text-lg text-zinc-300 font-semibold">
            Place Of Birth
          </h1>
          <h1 className="text-zinc-400 font-semibold">
            {info.detail.place_of_birth}
          </h1>
          <h1 className="mt-3 text-lg text-zinc-300 font-semibold">
            Also Known As
          </h1>
          <h1 className="text-zinc-400 font-semibold">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>
        {/* part 3 right, details ,and information */}
        <div className="w-[80%] pl-[4%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>
          <h1 className="text-xl text-zinc-200 font-semibold hover:underline underline-offset-1">
            Biography
          </h1>
          <p className="mt-3 text-zinc-400 text-justify">
            {info.detail.biography}
          </p>
          <h1 className="mt-5 text-xl text-zinc-200 font-semibold hover:underline underline-offset-1">
            Worked In
          </h1>
          <HorizontalCards data={info.combineCredits.cast} />

          <div className="w-full flex justify-between ">
            <h1 className="mt-5 text-xl text-zinc-200 font-semibold hover:underline underline-offset-1">
              {" "}
              Acting
            </h1>
            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="list-disc text-zinc-400 w-full mt-5 h-[50vh] overflow-x-hidden overflow-y-auto shadow-2xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-800 p-5">
            {(info[category + "Credit"] || info[category + "Credits"]).cast.map(
              (c, i) => (
                <li
                  key={i}
                  className="mt-5 hover:text-white duration-300 cursor-300 cursor-pointer"
                >
                  <Link to={`/${category}/details/${c.id}`}>
                    <span>
                      {c.name || c.title || c.original_name || c.original_title}
                    </span>
                    <span className="block ml-5">
                      {c.character && `Character Name: ${c.character}`}
                    </span>
                  </Link>
                </li>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Persondetails;
