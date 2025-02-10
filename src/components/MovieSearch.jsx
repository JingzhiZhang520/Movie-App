import React, { useState } from "react";
import { fetchMovies } from "../api.js";

const MovieSearch = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (newPage = 1) => {
    setError("");
    if (!query) return;

    try {
      const movies = await fetchMovies(query, newPage);
      if (!movies || movies.length === 0) {
        setError("No movies found. Try another search.");
      }
      onResults(movies);
      setPage(newPage);
      setHasSearched(true);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(1);
    }
  };

  return (
    <div className="p-4 text-center">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => handleSearch(1)} className="ml-2 glow-button">
        Search
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {hasSearched && (
        <div className="mt-4">
          {page > 1 && (
            <button onClick={() => handleSearch(page - 1)} className="glow-button">
              Previous Page
            </button>
          )}
          <button onClick={() => handleSearch(page + 1)} className="ml-2 glow-button">
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;