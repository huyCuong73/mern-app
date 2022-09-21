import { CancelOutlined, Star, StarBorder } from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./ratingstat.scss"
import { getMovieRequest } from '../../redux/actions/movie';
import RatingModal from '../ratingmodal/RatingModal';
import { useParams } from 'react-router-dom';
import axios from "axios"

const RatingStat = ({movieId, movieOrg}) => {
  let movie = movieOrg
 
  
  const [userRating, setUserRating] = useState(null)
  const [isRated,setIsRated] = useState(false)
  const userId = useSelector(state => state.auth.user._id)

  const [toggleModal, settoggleModal] = useState(false)

  const [ratingData,setRatingData] = useState(null)
  const handleModalDisplay = (modalDisplay) => {
    settoggleModal(modalDisplay)
  }

  useEffect(()=>{
    if(movie.rating) {
      for(let i = 0 ; i < movie.rating.length; i++ ){
        if(movie.rating[i].userId === userId){
          setUserRating(movie.rating[i].rating)
          setIsRated(true)
          break
        }
      }
    };
  },[movie])

  const handleRatingModal = (state) => {
    settoggleModal(true)
  }

  const onRating = () => {
    settoggleModal(false)
  }

  

  const handleRating = async (rating) => {

    const res = await axios.post(`https://react-rating-app-thc.herokuapp.com/api/movies/${movieId}/reviews`,
    {
        rating,
        userID:userId

    },
    {
        headers: {
            token:
            "Bearer " +
            JSON.parse(localStorage.getItem("user")).accessToken,
          },
    })
    setRatingData(res.data)
  }
 
  if(ratingData){

    movie = ratingData
   
    // setIsRated(true)
  }


  const stat = movie.ratingStat
  const tail = ([x, ...xs]) => xs;
  const rates = tail(stat)


  
  return (
  
  <div className='rating'>

    {toggleModal && 
      <>
        <div className='exitModal' onClick={onRating}>
          <CancelOutlined className = "exitIcon"/>
        </div>
        <RatingModal movieId = {movie._id}  handleModalDisplay = {handleModalDisplay} handleRating={handleRating}/>
      </>
    }
    <div className='showRating'>
      <div className='avgRating'>
        <p>TMDb rating</p>
        <Star className='starRate'/>
        {movie.avgRating && (<span>{Math.round(movie.avgRating * 100) / 100 }/10 ({movie.ratingStat[0]})</span>)}
      </div>
      
      {
        (!isRated && !ratingData) ? (
          <div className='userRating'>
            <p>Rate now</p>  
            <StarBorder className='starRate' onClick={() => handleRatingModal(true)}/>
            <span>?/10</span> 
          </div>                 
        ) : (
          <div className='userRating'>
            <p>your rating</p>  
            <Star className='starRate' onClick={() => handleRatingModal(true)}/>
            {
              !ratingData ? 
              <span>{userRating}/10</span> 
              :
              <span>{movie.rating}/10</span> 
            }
            
          </div>    
        )
      }

      
        </div>
        <div className='ratingChart'>
          <div className='chartDetail'>
            <span>
              Rating
            </span>
            <div className='barWrapper'>

            </div>
            <div className = 'band'>
              Votes
            </div>
          </div>
          {
            rates.map((rate,i) => (
              <div className='chartDetail'>
                <span>
                  {i + 1}
                </span>
                <div className='barWrapper'>
                  <div className='bar' style = {{width: `${rate/stat[0]*100}%`}}>

                  </div>
                </div>
                <div className = 'band' >
                  {rate}
                </div>
              </div>          
              ))
            }     
    </div>
  </div>
    
  );
}

export default RatingStat;
