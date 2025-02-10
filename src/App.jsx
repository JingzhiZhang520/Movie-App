import React, { useState, useEffect } from "react";
import MovieSearch from "./components/MovieSearch.jsx";
import MovieList from "./components/MovieList.jsx";
import Bookmarks from "./components/Bookmarks.jsx";
import { getBookmarks } from "./utils/storage.js";
import { fetchTrendingMovies } from "./api.js"; // ✅ Ensure correct import

function App() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bookmarks, setBookmarks] = useState(getBookmarks() || []);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setTrending(trendingMovies);
    };
    getTrendingMovies();
  }, []);

  const handleBookmark = (movie) => {
    if (!bookmarks.some((b) => b.imdbID === movie.imdbID)) {
      const updatedBookmarks = [...bookmarks, movie];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    }
  };

  return (
    <div className="fullscreen-bg flex flex-col">
      <div className="bg-gray-900 bg-opacity-80 min-h-screen flex flex-col w-full">
        <h1 className="text-4xl font-bold my-6 text-center">🎬 Movie Search App</h1>
        <div className="flex flex-col items-center">
          <MovieSearch onResults={setMovies} />
        </div>
        
        {/* ✅ Show Trending Movies if No Search */}
        {movies.length === 0 && (
          <div className="container mx-auto mt-6">
            <h2 className="text-2xl text-white font-bold mb-4">🔥 Trending Movies</h2>
            <MovieList movies={trending} bookmarks={bookmarks} onBookmark={handleBookmark} />
          </div>
        )}

        <div className="flex-grow container mx-auto mt-6">
          <MovieList movies={movies} bookmarks={bookmarks} onBookmark={handleBookmark} />
          <Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} />
        </div>
      </div>
    </div>
  );
}

export default App;
