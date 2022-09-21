import Review from './review/Review'
import CommentModal from './commentmodal/CommentModal'
import "./commentsection.scss"

import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { AddCommentRounded, MapsUgcRounded } from '@mui/icons-material';

export default function CommentSection({movieId}) {
    
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [toggleModal, setToggleModal] = useState(false)
  
    useEffect(() => {
        const getComment = async () => {
        try {
            const res = await axios.get(
            `https://react-rating-app-thc.herokuapp.com/api/movies/${movieId}/reviews/comments?page=${page}`,
            {
                headers: {
                    token:
                    "Bearer " +
                    JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                }
            );
            setComments(res.data.comments)     
            setPageCount(res.data.pageCount)
                
        } catch (err) {
            console.log(err);
        }
    };
      getComment();
    },[page, toggleModal,movieId]);

    function handlePrevious() {
        setPage((p) => {
            if (p === 1) return p;
            return p - 1;
        });
    }
    
    function handleNext() {
        setPage((p) => {
            if (p === pageCount) return p;
            return p + 1;
        });
    }

    const closeModal = (close) => {
        setToggleModal(close)
    }

    return (
        <div className='reviews'>
            {toggleModal && <CommentModal closeModal={closeModal}/>}
            <div className='reviewAction'>
                <h2>
                &emsp;User Reviews
                </h2>
                <AddCommentRounded className='addReview' onClick = {() => setToggleModal(true)}/>
            </div>

            {comments.map((comment) => (
                <Review comment={comment} />
            ))}

            <div className='pageControl'>
                <button disabled={page === 1} onClick={handlePrevious}>
                    Previous
                </button>
                <button disabled={page === pageCount} onClick={handleNext}>
                    Next
                </button>
                <select
                value={page}
                onChange={(event) => {
                    setPage(event.target.value);
                }}
                >
                {[...Array(pageCount)]
                    .map((_, index) => {
                    return <option key={index}>{index + 1}</option>;
                    })}
                </select>
            </div>          
        </div>
    )
}
