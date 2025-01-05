// import { title } from "process";
import SearchIcon from './../assets/search.svg'
import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard';

const API_URL = " http://www.omdbapi.com?apikey=b6003d8a";

const MovieSearch = () => {
  const [searchterm, setsearchterm] = useState(``);
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    searchmovie(`transformers`);
  },[]);

  const searchmovie = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      console.log(data);
      setmovies(data.Search || [])
    } 
    catch (error) {
      console.log("Eroor searching movies", error);
    }
  };
  

  return (
    <div className="search-container">
      <div className="search">
        <input type="text" 
          value={searchterm}
          onChange={(e)=>setsearchterm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
                searchmovie(searchterm)
            }
        }}
          placeholder="Search for movies"
        />
        <img src={SearchIcon} alt="search"
          onClick={() =>searchmovie(searchterm)}
          />
      </div>
      {movies.length > 0 ? (
        <div className='container'>
          {movies.map((movie)=>(
            <div key={movie.imdbID}>
            <MovieCard movie={movie} />
            </div>
            ))}
        </div>
        ):(
          <div className='empty'>
            <h2>No Movies Found</h2>
          </div>
        )}
    </div>
  )
};

export default MovieSearch;
