import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions';
import GptSearchBar from './GptSearchBar';
import { BG_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <div >
      <img alt="/" src={BG_IMG} className='fixed -z-10 h-screen md:w-full object-cover' ></img>
     <GptSearchBar/>
     <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch;
