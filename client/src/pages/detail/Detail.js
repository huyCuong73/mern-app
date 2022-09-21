import { ArrowForwardIosOutlined, CancelOutlined, HighlightOutlined, PlayCircleOutline, Star, StarBorder, } from '@mui/icons-material'
import React,{useEffect, useState, } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import CastList from '../../components/castlist/CastList'
import PhotoList from '../../components/photolist/PhotoList'
import "./detail.scss"
import CommentSection from '../../components/commentsection/CommentSection'
import { getMovieRequest } from '../../redux/actions/movie'
import Header from '../../components/Header/index'
import RatingStat from '../../components/ratingstat/RatingStat'
import RatingModal from '../../components/ratingmodal/RatingModal'
import { postRatingRequest } from '../../redux/actions/rating'
import PlayTrailer from '../../components/playtrailer/PlayTrailer'

export default function Detail() {
  const dispatch = useDispatch();


  const [trailerOn, setTrailerOn] = useState(false)
  const {id} = useParams()
  const movie = useSelector(state => state.movie.movie)
  const movieStatus = useSelector(state => state.movie.isLoading)
  const ratingStat = movie.ratingStat
  
  useEffect(() => {
    dispatch(getMovieRequest(id))
  },[dispatch, id])
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  const handleCloseTrailer = (state) => {
    setTrailerOn(state)
  }

  if(movieStatus === true){
    return (
      <div style = {{color: "white", position: "fixed", top: "50%", left : "50%", transform: "translate(-50%,-50%)" }}>Loading...</div>
    )
  }

  return (
    <div className='ratingPage'>
      { trailerOn && <PlayTrailer handleCloseTrailer={handleCloseTrailer} url = {movie.trailer}/>}  
      <Header />
      <div className='headerInfo'>
        <div className='trailer' onClick={() => setTrailerOn(true)}>
          <img src = {movie.portraitImg}></img>
          <div className='overlay'>See Trailer</div>
          <PlayCircleOutline className='playButton'></PlayCircleOutline>
        </div>
        <div className='mainInfo'>
          <div className='title'>
            <div className='movieTitleWrapper'>
              <h1 className='movieTitle'>
                {movie.title}
              </h1>
            </div>
            <div className='genres'>
              <span>{movie.ageRating} </span><span>{movie.genre} </span><span>{movie.releaseDate}</span>
              
            </div>
          </div>
          <div className='overview'>
            <h3>Overview</h3>
            <p>{movie.des}</p>
          </div>
          <div className="executive">

          </div>
        </div>

          { ratingStat && <RatingStat movieId={movie._id} movieOrg = {movie}/>}
      </div>

      <div className='topCast'>
        <h1>Top Cast</h1>
        {movie.castList && <CastList castList= {movie.castList}/>}
      </div>

      <div className='fullCast'>
        <h2>
          &emsp;See Full Cast & Crew
        </h2>
      </div>

      <div className='photos'>
        <h1>Photos</h1>
        <PhotoList/>
      </div>

      {movie._id && <CommentSection movieId={movie._id}/>}

      <div className = "more">
        <h1>More Like This</h1>
        <div className='inform'>
          <span>Not enough data</span>
        </div>
      </div>

    </div>
  )
}

