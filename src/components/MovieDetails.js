import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_OPTIONS, BG_IMG, IMG_CDN_URL } from '../utils/constants';
import { addMovieDetail } from '../utils/moviesSlice';
import { clearTrailerVideo } from '../utils/moviesSlice';
 




const MovieDetails = () => {
  const navigate=useNavigate();

  const {id}=useParams();
  const dispatch=useDispatch();
const getMovieDetail=async()=>{
  const data=await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, API_OPTIONS);
  const json=await data.json();
  dispatch(addMovieDetail(json));
  
}
useEffect(()=>{

getMovieDetail();

},[]);



const movie=useSelector((store)=>store.movies.movieDetail)

if(!movie) return null;


 const {title,original_language,overview,poster_path,release_date,runtime,vote_average}=movie;

 const handleWatchTrailer=()=>{
  dispatch(clearTrailerVideo());
  navigate("watch");
 }
 
  return (
  <>
     <img alt="/" src={BG_IMG} className='h-[100%] w-[100%] ' ></img>
     <div className='absolute top-28 left-36'>
    <div className=' w-[80%] h-[70%] m-5 text-white'>
        <div className=' m-3 bg-yellow bg-red-600 p-1 rounded-xl'>
          <h1 className='font-bold text-2xl text-center'>{title}</h1>
        </div>
        <div className='flex  m-2  h-[80%] text-xl p-2  bg-black bg-opacity-80 rounded-xl'>
          <div className=' rounded-xl'><img alt="/" src={IMG_CDN_URL+poster_path} className='rounded-xl'></img></div>
          <div className=' mx-2 w-[100%]'>
            <div className='p-2 italic font-light ' >{overview}</div>
            <div className='p-2'>
            <p className='font-md '>Release Date:<span className='italic font-light'> {release_date}</span></p> 
            <p className='font-md'>Original Language: <span className='italic font-light'>{original_language}</span></p> 
            <p className='font-md'>Run Time:<span className='italic font-light'> {runtime} min</span></p>  
            <p className='font-md'>IMDB Rating: <span className='italic font-light'>{vote_average}</span></p> 
            <button className='bg-red-600 text-xl p-2 m-2 rounded-xl'onClick={handleWatchTrailer}>Watch Trailer</button> 
              </div>
          </div>
        </div>
      
    </div></div></>
  )
}

export default MovieDetails
