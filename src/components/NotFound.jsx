import React from "react";
import notfound from "/img404.gif"

function NotFound() {
  return <div className="w-full h-full flex justify-center items-center bg-black">
    <img className="h-[50%] " src={notfound} alt="" />
  </div>;
}

export default NotFound;
