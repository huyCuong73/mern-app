import { HighlightOffOutlined } from '@material-ui/icons';
import React from 'react';

import "./playtrailer.scss"

const PlayTrailer = ({handleCloseTrailer, url}) => {

    const youtubeParser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const id = (youtubeParser(url));

    return (
        <div className='videoContainer'>
            <div className='overlay'></div>
            <HighlightOffOutlined className='closeBtn' onClick = {() => handleCloseTrailer(false)}/>
            <iframe
                className='video'

                src={`https://www.youtube.com/embed/${id}`}
                title="Youtube Player"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
}

export default PlayTrailer;
