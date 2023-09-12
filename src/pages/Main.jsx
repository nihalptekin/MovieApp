import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'

const Main = () => {
    // movie ve loading setlerini moviecontexten getirdik
    const {movie, loading} =useContext(MovieContext)
    // console.log(movie);
  return (
    <>
    <div className='flex, justify-center'>
    {loading ? (
        <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        
    ) : (
          movie.map((movie) => <MovieCard key={movie.id} {...movie} />)
          )
          }


    </div>
    </>
  )
}

export default Main