import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Moviedetails from "./components/Moviedetails";
import NotFound from "./components/NotFound";
import Trailer from "./components/partials/Trailer";
import People from "./components/People";
import Persondetails from "./components/Persondetails";
import Popular from "./components/Popular";
import Trending from "./components/Trending";
import Tvdetails from "./components/Tvdetails";
import Tvshows from "./components/Tvshows";

function App() {
  return (
    <>
      <div className="bg-[#1F1E24] w-screen h-screen flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/details/:id" element={<Moviedetails />}>
            <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          </Route>
          <Route path="/tv" element={<Tvshows />} />
          <Route path="/tv/details/:id" element={<Tvdetails />} >
            <Route path="/tv/details/:id/trailer" element={<Trailer/>} />
          </Route>
          <Route path="/person" element={<People />} />
          <Route path="/person/details/:id" element={<Persondetails />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
