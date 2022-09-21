export const getMovieRequest = (movieId) => ({
    type: "GET_MOVIE_REQUEST",
    movieId
});
export const getMovieSuccess = (payload) => ({
    type: "GET_MOVIE_SUCCESS",
    movie:payload
});
export const getMovieFailure = () => ({
    type: "GET_MOVIE_FAILURE",
});
  
  
  
