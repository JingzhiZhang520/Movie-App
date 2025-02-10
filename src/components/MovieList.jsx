import React, { useState } from "react";
import MovieDetailsModal from "./MovieDetailsModal.jsx";

const MovieList = ({ movies, bookmarks, onBookmark }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {movies.map((movie) => {
        const isBookmarked = bookmarks.some((b) => b.imdbID === movie.imdbID);

        // Use a stable placeholder for missing posters
        const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

        // Use placeholder if poster is missing or "N/A"
        const posterUrl = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : placeholderImage;

        return (
          <div key={movie.imdbID} className="movie-card">
            {/* Use placeholder if image fails to load */}
            <img
              src={posterUrl}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              onError={(e) => (e.target.src = placeholderImage)} // Fix broken images
            />
            <h2 className="text-lg font-bold mt-2 text-white">{movie.Title}</h2>

            {/* Bookmark Button */}
            <button
              onClick={() => !isBookmarked && onBookmark(movie)}
              className={`mt-2 w-full p-2 rounded transition-all ${
                isBookmarked ? "bg-gray-500 cursor-not-allowed" : "glow-button"
              }`}
              disabled={isBookmarked}
            >
              {isBookmarked ? "Bookmarked ✅" : "Bookmark"}
            </button>

            {/* New "View Details" Button */}
            <button
              onClick={() => setSelectedMovie(movie)}
              className="mt-2 w-full p-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Details
            </button>
          </div>
        );
      })}

      {/* Render Modal if a Movie is Selected */}
      {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
};

export default MovieList;
