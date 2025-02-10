import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api.js"; // Ensure correct import

const MovieDetailsModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const data = await fetchMovieDetails(movie.imdbID);
      setDetails(data);
    };
    getDetails();
  }, [movie]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold">{details?.Title || "Loading..."}</h2>
        <p className="text-gray-600">{details?.Plot}</p>
        <p><strong>Rating:</strong> {details?.imdbRating}</p>
        <p><strong>Release Year:</strong> {details?.Year}</p>
        <button onClick={onClose} className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieDetailsModal;