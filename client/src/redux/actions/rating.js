export const postRatingRequest = (payload) => ({
    type: "GET_RATING_REQUEST",
    userRating:payload.rating,
    movieId: payload.movieId
});
export const postRatingSuccess = (payload) => ({
    type: "GET_RATING_SUCCESS",
    payload
});
export const postRatingFailure = () => ({
    type: "GET_RATING_FAILURE",
});