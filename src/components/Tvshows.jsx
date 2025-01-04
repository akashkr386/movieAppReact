import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./loading";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./partials/Card";

function Tvshows() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, settvshows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "TV Shows " + category.toUpperCase();

  const gettvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        settvshows((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refresHandler = async () => {
    if (tv.length === 0) {
      gettvshows();
    } else {
      setpage(1);
      settvshows([]);
      gettvshows();
    }
  };

  useEffect(() => {
    refresHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between">
        <h1 className="px-[5%] text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
            TV Shows
          <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={gettvshows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Tvshows;
