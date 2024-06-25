import React from 'react'
import { BG_IMG } from '../utils/constants'
import { useSelector } from 'react-redux'
import lang  from '../utils/languageConstants'

const GptSearchBar = () => {
    const langKey=useSelector((store)=>store.config.lang)
  return (
    <>
   <img alt="/" src={BG_IMG}></img>
    <div className='absolute top-[25%]  w-full flex justify-center   items-center'>
        <form className='bg-black rounded-xl'>
            <input type="text" placeholder={lang[langKey].getSearchPlaceholder} className=' m-3 px-3 w-[50vw] h-10 text-lg rounded-xl'></input>
            <button className='text-white bg-red-600 py-1 px-2 mx-2 rounded-lg h-10 w-20'>{lang[langKey].search}</button>
        </form>
      
    </div> </>
  )
}

export default GptSearchBar
