import React from 'react'

const MovieCard = () => {
  return (
    <div
    className="movie"
    id="container"
    onClick={() => navigate("/details/" + id)}
  >
    <img
      loading="lazy"
      src={poster_path ? IMG_API + poster_path : defaultImage}
      alt="movie-card"
    />
    <div className="flex align-baseline justify-between p-1 text-white">
      <h5>{title}</h5>

      {currentUser && (
        <span className={`tag ${getVoteClass(vote_average)}`}>
          {vote_average.toFixed(1)}
        </span>
      )}
    </div>
    <div className="movie-over">
      <h2>Overview</h2>
      <p>{overview}</p>
    </div>
  </div>
  )
}

export default MovieCard