import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";
//743f0a98

const API_URL = "https://www.omdbapi.com?apikey=743f0a98";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("spiderman");
  }, []);
  return (
    <div className="app">
      <h1>ShowTime</h1>

      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img src={SearchIcon} 
        alt="search" 
        onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          <MovieCard movie={movies[0]} />
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
