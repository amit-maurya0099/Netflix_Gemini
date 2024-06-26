import React from "react";
import { useParams } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import { BG_IMG } from "../utils/constants";

const WatchTrailer = () => {
  const { id } = useParams();
  
  useMovieTrailer(id);
  const trailerVideo =useSelector((store)=>store.movies.trailerVideo)
 

  return (
    <>
    <img src={BG_IMG} alt="/" className="bg-gradient-to-r from-black h-screen w-screen" ></img>
    <div className=" absolute  top-[12%] left-[20%]  " >
      <iframe
        width="900"
        height="550" 
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=8Z3CH72i3K0VdlU-`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div></>
  );
};

export default WatchTrailer;
