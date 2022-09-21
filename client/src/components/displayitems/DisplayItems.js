import { Star } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

import './displayitem.scss'

const DisplayItems = ({movies}) => {
    return (
        <div className='itemContainer'>
            {
                movies.map( movie => (
                    <Link to = {`/review/${movie._id}`}> 
                        <div className='item'>
                            
                            <img src={movie.portraitImg}></img>
                            <div className='ratingOverview'>
                                <Star />
                                <span>{Math.round(movie.avgRating * 100) / 100 }/10 ({movie.numRatings} votes)</span>
                            </div>
                            <div className='title'>
                                <span className="link"> 
                                    {movie.title}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}

export default DisplayItems;
