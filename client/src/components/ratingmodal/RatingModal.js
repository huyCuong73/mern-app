import React, { useCallback, useEffect, useState } from 'react';
import { ArrowForwardIosOutlined, PlayCircleOutline, Star, StarBorder } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"

import * as actions from "../../redux/actions/rating"
import "./ratingmodal.scss"

const RatingModal = ({movieId,handleRatingDisplay,handleModalDisplay, handleRating}) => {

    const [rating,setRating] = useState(null)
    
 
    // const handleRating = useCallback((e) => {
      
    //     dispatch(
    //         actions.postRatingRequest({
    //         rating:{rating, userId},
    //         movieId
    //     }))
    
    // },[dispatch,movieId,userId,rating,handleRatingDisplay])

    return (
        <div className='ratingModal'>
            <div className='showRating'>
                <Star className='scoreContainer'/>
                <div className='ratingScore'><span>{rating}</span></div>
            </div>
            <div className='starContainer'>
                {   
                    [...Array(10)].map((star,i) => {
                        const ratingValue = i+1;
                        return(
                        <label>
                            <input 
                                type="radio" 
                                name='rating' 
                                value={ratingValue}
                                onClick = {() => setRating(ratingValue)}
                            />
                            <Star className='starRate' style = {{color: ratingValue <= rating ? "yellow" : "white"}}/>
                        </label>
                        )
                     })
                }            
            </div>
            {
                rating ?
                <div className='ratingButton'>
                    <button  onClick={ (e) => {
                        e.preventDefault()
                        handleRating(rating)
                        handleModalDisplay(false)
                        
                        }}>
                        RATE THIS   
                    </button>
                </div>
                :
                <div className='ratingButtonDisabled'>
                    <button >
                        RATE THIS   
                    </button>
                </div>               
            }
        </div>
    );
}

export default RatingModal;
