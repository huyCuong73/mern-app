
import axios from 'axios'

const URL = 'https://react-rating-app-thc.herokuapp.com';

export const fetchPosts = () => axios.get(`${URL}/posts`)
export const createPost = (data) => {
   
    axios.post(`${URL}/posts`,data)
        .then(response => console.log(response) )
        .catch(error => {
            console.error('There was an error!', error);
    });
}
export const updatePost = (data) => axios.post(`${URL}/posts/update`,data)

export const createUser = (data) => axios.post(`${URL}/api/register`,data)
export const loginStart = (user) => axios.post(`${URL}/api/auth/login`,user)

export const fetchMovie = (movieId) => axios.get(`${URL}/api/movies/${movieId}`,{
    headers: {
        token:
        "Bearer " +
        JSON.parse(localStorage.getItem("user")).accessToken,
        'Access-Control-Allow-Origin': '*'
      },
})
  


export const postRating = (data) => axios.post(`${URL}/api/movies/${data.movieId}/reviews`, data.userRating,{
    headers: {
        token:
        "Bearer " +
        JSON.parse(localStorage.getItem("user")).accessToken,
      }, 
})

export const searchMovies = (text) => axios.get(`${URL}/api/movies/find/?text=${text}`,{
    headers: {
        token:
        "Bearer " +
        JSON.parse(localStorage.getItem("user")).accessToken,
      },
})