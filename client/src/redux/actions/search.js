export const getSearchRequest = (query) => ({
    type: "GET_SEARCH_REQUEST",
    query
});
export const getSearchSuccess = (payload) => ({
    type: "GET_SEARCH_SUCCESS",
    movies:payload
});
export const getSearchFailure = () => ({
    type: "GET_SEARCH_FAILURE",
});
  
  
  
