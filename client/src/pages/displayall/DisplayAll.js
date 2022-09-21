import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios"
import Header from '../../components/Header';
import DisplayItems from '../../components/displayitems/DisplayItems';

const DisplayAll = ({type}) => {
    const [movies, setMovies] = useState(null)
    const {genre} = useParams()
    console.log("movies",`https://react-rating-app-thc.herokuapp.com/api/movies${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`);

    useEffect(() => {
        const getMoviesLists = async () => {
          try {
            const res = await axios.get(
              `https://react-rating-app-thc.herokuapp.com/api/movies${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
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
        getMoviesLists();
        
      }, [type,genre]);
    
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

export default DisplayAll;
