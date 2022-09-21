import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayItems from '../../components/displayitems/DisplayItems';
import Header from '../../components/Header';
import axios from "axios"

const Popular = () => {
    const [movies, setMovies] = useState(null)
    const {genre} = useParams()


    useEffect(() => {
        const getRandomLists = async () => {
          try {
            const res = await axios.get(
              `https://react-rating-app-thc.herokuapp.com/api/movies/popular`,
              {
                headers: {
                  token:
                  "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
              }
            );
            
            setMovies(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getRandomLists();
        
      }, []);
    
    if(!movies){
      return (
        <div style={{position:"fixed",color: "white",top: "50%", left: "50%", translate: "transform(-50%,-50%}"}}>
          Loading...
        </div>
      )
    }
    return (
        <div>
          <Header />
          <DisplayItems movies = {movies}/>
        </div>
    );
}

export default Popular;
