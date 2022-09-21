import React, { useEffect, useRef, useState } from 'react'
import { InfoOutlined, PlaceOutlined, PlayArrow, PlayCircleFilledOutlined } from "@mui/icons-material"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

import style from "./featured.module.scss"
import PlayTrailer from '../playtrailer/PlayTrailer'


export default function Featured({type}) {
  
  const [movies, setMovies] = useState(null)
  const [genre, setGenre] = useState("")
  const [featuredState, setFeaturedState] = useState({})
  const [trailerOn, setTrailerOn] = useState(false)
  const [url, setUrl] = useState("")

  let navigate = useNavigate();
  if(genre){
    let t;
    type === "movie" ? t = "movies" : t = "series"
    navigate(`/${t}/${genre}`)
  }
  

  useEffect(() => {
    const getUpcomings = async () => {
      try {
        const res = await axios.get(
          `https://react-rating-app-thc.herokuapp.com/api/movies/upcoming${type ? "?type=" + type : ""}`,
          {
            headers: {
              token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        
        const data =[...res.data]
        const featured = data.shift()
        setMovies(data)
        setFeaturedState(featured)
      } catch (err) {
        console.log(err);
      }
    };
    getUpcomings();
    
  }, [type]);

  const handleCloseTrailer = (state) => {
    setTrailerOn(state)
  }

  if(!movies){
    return(
      <div className='loading'>
        Loading...
      </div>
    )
  }


  return (
    <div className= {style.intro}>
      { trailerOn && <PlayTrailer handleCloseTrailer={handleCloseTrailer} url = {url}/>}
      <div className= {style.featured} style={{ background: `linear-gradient(to bottom, transparent 0%,transparent 40%,rgba(17, 17, 17, 0.4) 50%,rgba(17, 17, 17, 0.8) 70%,rgba(17, 17, 17, 1) 90%), url(${featuredState.landscapeImg})` }}>
        {type && (
          <div className= {style.category}>
            <span style= {{fontWeight:"bold", color:"yellow"}}>{type === "movie" ? "Movies" : "Series"}</span>
            <select
              name="genre"
              id="genre"
              onChange={(e) => {
                setGenre(e.target.value)
              }}
            >
              <option>Genre</option>
              <option value="all">All</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Horror</option>
              <option value="drama">Drama</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>
        )}
          {/* <img src="https://picsum.photos/1000/700"/> */}

        <div className={style.info}>
          <img src= {featuredState.portraitImg} alt="" />
          <span className={style.title}>
            {featuredState.title}
          </span>
          <span className={style.des}>
            {featuredState.des}
          </span>
          <div className={style.buttons} >
            <button className={style.play} onClick = { e => {
            e.preventDefault()
            setTrailerOn(true) 
            setUrl(featuredState.trailer)
          }}>
              <PlayArrow className={style.playArrow}/>
              <span>Play trailer</span>
            </button>


            <Link to = {`/review/${featuredState._id}`} >
              <button className={style.more}>
                <InfoOutlined></InfoOutlined>
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className= {style.upComing}>
          <span>Upcoming</span>

          {
            movies.map( movie => (
    
                
              <div className= {style.upComingItem}>

                <img src={movie.portraitImg} alt=""  
                  onClick={() => {
                    const data =[...movies]
                    const dataFiltered = data.filter((elements) => (elements._id !== movie._id))
                   
                    setMovies([...dataFiltered,featuredState])
                    setFeaturedState(movie)
                  }}
                
                />
                <div className={style.upcomingInfo}>
                  <span>
                    {movie.des}
                  </span>
                  <div className={style.playTrailer} onClick = {() => {
                    setTrailerOn(true)
                    setUrl(movie.trailer)
                  }}>
                    <PlayCircleFilledOutlined className={style.playTrailerButton}/>
                    <span>
                      Play Trailer
                    </span>
                  </div>
                </div>
              </div>
             
            ))
          }

      </div>

    </div>
  )
}
