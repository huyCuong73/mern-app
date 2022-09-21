import React, { useCallback, useEffect, useState } from "react";
import axios from "axios"
import {Button, Container} from '@material-ui/core'
import Header from "../../components/Header";
import style from "./Home.module.scss"
import Featured from "../../components/featured/Featured";
import MovieList from "../../components/movielist/MovieList";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function HomePage({type}){
  const [lists, setLists] = useState([]);

  const location = useLocation();
  
  useEffect(() => {
      setLists(location.data)
      const getLists = async () => {
        try {
          const res = await axios.get(
            `https://react-rating-app-thc.herokuapp.com/api/lists${type ? "?type=" + type : ""}`,
            {
              headers: {
                token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              },
            }
          );
          
          setLists(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getLists();
      
    }, [type]);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [type])
  
    
  if(!lists){
    return(
      <div>
        <Header />  
        <Featured type = {type} />  
        <h1 style={{marginTop:"50px", color:"white"}}>
          Loading...  
        </h1>   
      </div>
    )
  }

  return(
    <div className= {style.home}>
        <Header />
        <Featured type = {type} /> 
        {lists.map(list => 
            (<MovieList list={list} />)
        )}
        
    </div>
  )
}