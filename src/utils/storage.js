export const getBookmarks = () => {
  const saved = localStorage.getItem("bookmarks");
  return saved ? JSON.parse(saved) : []; // Always return an array
};


export const saveBookmark = (movie) => {
  if (!movie || !movie.imdbID || !movie.Title) return; // Prevent saving empty movies

  let bookmarks = getBookmarks();
  if (!bookmarks.some((m) => m.imdbID === movie.imdbID)) {
    bookmarks.push({ ...movie, review: "" }); // Ensure each movie has a review field
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};

export const saveReview = (movieId, review) => {
  let bookmarks = getBookmarks();
  let movie = bookmarks.find((m) => m.imdbID === movieId);
  if (movie) {
    movie.review = review; // Save review to the movie object
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};

export const removeBookmark = (id) => {
  let bookmarks = getBookmarks().filter((m) => m.imdbID !== id);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};


export const toggleWatched = (movieId) => {
  let bookmarks = getBookmarks();
  let movie = bookmarks.find((m) => m.imdbID === movieId);
  if (movie) {
    movie.watched = !movie.watched; // Toggle the watched status
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};

  
  