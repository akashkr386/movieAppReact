import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./partials/Card";

function People() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "People " + category.toUpperCase();

  const getpeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refresHandler = async () => {
    if (people.length === 0) {
      getpeople();
    } else {
      setpage(1);
      setpeople([]);
      getpeople();
    }
  };

  useEffect(() => {
    refresHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex items-center justify-between">
        <h1 className="px-[5%] text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          People
          <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />          
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getpeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
