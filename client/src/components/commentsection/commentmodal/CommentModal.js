import { CloseOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import "./commentmodal.scss"

import axios from "axios" 
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CommentModal = ({closeModal}) => {
    const [headline,setHeadline] = useState("")
    const [comment,setComment] = useState("")
    const {id} = useParams()
    const user = useSelector( state => state.auth.user)
    const username = user.username
    
    const postReview = async () => {

        await axios.post(`https://react-rating-app-thc.herokuapp.com/api/movies/${id}/reviews`,
        {
            username,
            headline,
            comment,
            userID:user._id

        },
        {
            headers: {
                token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
              },
        })

        closeModal(false)
    }


    return (
        <div className='commentModal'>
            <CloseOutlined className='closeModal' onClick = {() => closeModal(false)}/>
            <div className='reviewWrapper'>
                <label className='reviewHeadline'>
                    <div >Write a headline for your review:</div>
                    <input 
                        className='reviewHeadlineInput' 
                        type="text" 
                        maxLength={150}
                        onChange={(e) => setHeadline(e.target.value)}
                    />
                </label>
                <label className='reviewBody'>
                    <div>Write your review:</div>
                    <textarea 
                        className='reviewBodyInput'
                        type="text"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
            </div>
            <div className='submitWrapper'>
                <button 
                    onClick={postReview}>Submit</button>
            </div>
        </div>
    );
}

export default CommentModal;
