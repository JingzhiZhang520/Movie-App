import React, { useEffect, useState } from "react";
import { getBookmarks, removeBookmark, saveReview, toggleWatched } from "../utils/storage.js";

const Bookmarks = ({ bookmarks, setBookmarks }) => {
  //Ensure bookmarks is always an array
  const [localBookmarks, setLocalBookmarks] = useState(bookmarks || []);

  useEffect(() => {
    const storedBookmarks = getBookmarks() || [];
    setLocalBookmarks(storedBookmarks);
  }, [bookmarks]);

  const handleRemove = (id) => {
    removeBookmark(id);
    setBookmarks(getBookmarks() || []);
  };

  return (
    <div className="p-6 w-full bookmarked-container">
      <h2 className="text-2xl font-bold bookmark-title">🎟️ Bookmarked Movies</h2>

      {/* Handle empty bookmarks */}
      {localBookmarks.length === 0 ? (
        <p className="text-gray-400 mt-2">No bookmarked movies yet. Start adding some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localBookmarks.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{movie.Title}</span>
                <button onClick={() => handleRemove(movie.imdbID)} className="text-red-400 hover:text-red-600">
                  ❌
                </button>
              </div>

              {/* Review Input */}
              <textarea
                className="w-full p-2 border rounded mt-2 bg-gray-700 text-white"
                placeholder="Leave a review..."
                value={movie.review || ""}
                onChange={(e) => {
                  saveReview(movie.imdbID, e.target.value);
                  setBookmarks(getBookmarks() || []); // Update UI immediately
                }}
              />

              {/* ✅ Mark as Watched Button */}
              <button
                onClick={() => {
                  toggleWatched(movie.imdbID);
                  setBookmarks(getBookmarks() || []); // Update UI immediately
                }}
                className={`p-2 mt-2 w-full rounded text-white ${
                  movie.watched ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                {movie.watched ? "✅ Watched" : "🎥 Mark as Watched"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
