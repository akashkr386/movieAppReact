import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./loading";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./partials/Card";

function Movie() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movie " + category.toUpperCase();

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refresHandler = async () => {
    if (movie.length === 0) {
        getMovie();
    } else {
      setpage(1);
      setmovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refresHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between">
        <h1 className="px-[5%] text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Movie<small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated","upcoming","now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />          
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie;
