import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = "5e1640f5266dfbb55ca7995f1829c767";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const Main = () => {
  const [filmler, setFilmler] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        setFilmler(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className='flex flex-wrap justify-center text-center items-center'>
      {filmler.map((film) => (
        <div key={film.id} style={{width:"200px", background:"orange", color:"white", margin:"20px",  }}>
          <img src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`} alt={film.title} />
          <p className='p-4'>{film.original_title}</p>
        </div>
      ))}
    </div>
  );
};

export default Main;
