import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./loading";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./partials/Card";

function Popular() {
  
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movie | Popular " + category.toUpperCase();


  const getpopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refresHandler = async () => {
    if (popular.length === 0) {
      getpopular();
    } else {
      setpage(1);
      setpopular([]);
      getpopular();
    }
  };

  useEffect(() => {
    refresHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between">
        <h1 className="px-[5%] text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Popular
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
          />          
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={getpopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
