import { ThumbDown, ThumbUp } from '@mui/icons-material'
import React from 'react'
import { useSelector } from 'react-redux'

import "./review.scss"

export default function Review({comment}) {
    const username = useSelector(state => state.auth.username)
    const dateString = new Date(comment.createdAt)
    const date = dateString.getHours() + ":" + dateString.getMinutes() + ", " + dateString.toDateString();
    
    
    return (
        <div className='userReview'>
            <div className='userInfo'>
                <img src="https://picsum.photos/300/200" alt="" />
                <div className='userName'>
                    {comment.username}
                </div>
            </div>
            <div className='comment'>
                <p className='headLine'>{comment.headline}</p>
                <div className='commentBodyWrapper'>
                    <p className='commentBody'>{comment.comment}</p>
                </div>
                <div className='reviewActions'>
                    <div className='upDate'>
                        {date}
                    </div>
                    <div className='actions'>
                        <ThumbUp />
                        <span>200</span>
                        <ThumbDown />
                        <span>300</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
