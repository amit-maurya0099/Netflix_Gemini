import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useDispatch, useSelector } from "react-redux";
import { BG_IMG } from "../utils/constants";
import { clearTrailerVideo } from "../utils/moviesSlice";

const WatchTrailer = () => {
  const dispatch=useDispatch();
  const { id } = useParams();
  const navigate=useNavigate();
  
  
  useMovieTrailer(id);
  const trailerVideo =useSelector((store)=>store.movies.trailerVideo)

  const handleGoBack=()=>{
    dispatch(clearTrailerVideo());
    navigate(`/browse/details/${id}`)
    
  }
 

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
      {trailerVideo && (<div className="bg-black flex justify-center"><button className='bg-red-600 text-xl p-2 m-2 rounded-xl text-white 'onClick={handleGoBack}>Go back</button></div>)}
    </div></>
  );
};

export default WatchTrailer;
