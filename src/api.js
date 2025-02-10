const API_URL = "https://movie-database-alternative.p.rapidapi.com/";

// Fetch movies by search query
export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${API_URL}?s=${query}&r=json&page=${page}`, {
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY, // Use .env.local
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.Search || []; // Handle empty results
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch movie details by IMDb ID
export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${API_URL}?i=${imdbID}&r=json`, {
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY, // Use .env.local
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Fetch trending movies (simulated by searching for popular movies)
export const fetchTrendingMovies = async () => {
  const trendingQueries = ["Avengers", "Titanic", "Inception", "Interstellar", "The Dark Knight"];
  const randomQuery = trendingQueries[Math.floor(Math.random() * trendingQueries.length)];

  return fetchMovies(randomQuery, 1);
};
