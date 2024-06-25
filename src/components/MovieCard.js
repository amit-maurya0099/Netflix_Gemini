import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div>
      <div className='   mx-2 my-1  w-40   '>
        <img alt="img" src={IMG_CDN_URL+ posterPath} className='rounded-lg'></img>
        
      </div>
    </div>
  )
}

export default MovieCard
