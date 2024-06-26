import React from 'react'
import { FaPlay } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

const VideoTitle = ({title,overview}) => {
  return (
    <div className=' md:absolute w-[90%] sm:top-[20%]  md:top-[35%] md:left-16  md:w-[25%] text-wrap bg-gradient-to-r from-black p-2 rounded-xl'>
        <h1 className=' font-semibold md:font-bold text-lg md:text-2xl text-white '>{title}</h1>
        <p className='text-white text-sm md:text-lg'>{overview}</p>
        <div className='flex items-center  '>
            <button
             className='bg-white border-gray-600 md:w-[100px] md:h-[50px] text-lg md:text-xl  rounded-lg  flex justify-center  px-2 items-center' 
             ><FaPlay />Play</button>
              <button
             className='bg-slate-400 bg-opacity-50 text-white border-gray-600 rounded-md  md:h-[50px] text-xl text-nowrap px-2 my-5
             mx-2 flex justify-center items-center ' 
             ><FaInfoCircle/>More Info</button>
        </div>
      
    </div>
  )
}

export default VideoTitle
