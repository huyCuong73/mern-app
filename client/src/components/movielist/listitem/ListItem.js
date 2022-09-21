import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovieRequest } from "../../../redux/actions/movie";
import { Star } from "@mui/icons-material";

export default function ListItem({ item, index }) {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({})


  
  useEffect(() => {
    setMovie(null)
    const getMovie = async () => {
      try{
        
        const res = await axios.get(`https://react-rating-app-thc.herokuapp.com/api/movies/${item}`,
        {
          headers: {
            token:
            "Bearer "
            +
            JSON.parse(localStorage.getItem("user")).accessToken,
          },
        } )
        setMovie(res.data)
      }catch (err){
        console.log(err)
      }
    }
    getMovie()
    
  },[item])

  if(!movie) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <Link to = {`/review/${movie._id}`}  >
      <div
        className="listItem"
        style={{ left: isHovered && index *300 - index* 140}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // onClick = {() => dispatch(getMovieRequest(movie._id))}
      >
        <img
          src={movie.portraitImg}
          alt=""
        />
        {!isHovered && (
          <div className="overView">
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
          )}
        {isHovered && (
          <>
            <video src={trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <h1 style = {{color:"white"}}>{movie.title}</h1>
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+16</span>
                <span>1999</span>
              </div>
              <div className="desc">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium hic rem eveniet error possimus, neque ex doloribus.
              </div>
              <div className="genre">Action</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}










// import style from "./listitem.module.scss";
// import {
//   PlayArrow,
//   Add,
//   ThumbUpAltOutlined,
//   ThumbDownOutlined,
// } from "@material-ui/icons";
// import { useState } from "react";


// export default function ListItem({ index }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const trailer =
//     "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
//   return (
//     <div
//       className={style.listItem}
//       style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
//         alt=""
//       />
//       {isHovered && (
//         <>
//           <video src={trailer} autoPlay={true} loop />
//           <div className={style.itemInfo}>
//             <div className={style.icons}>
//               <PlayArrow className={style.icon} />
//               <Add className={style.icon} />
//               <ThumbUpAltOutlined className={style.icon} />
//               <ThumbDownOutlined className={style.icon} />
//             </div>
//             <div className={style.itemInfoTop}>
//               <span>1 hour 14 mins</span>
//               <span className={style.limit}>+16</span>
//               <span>1999</span>
//             </div>
//             <div className={style.desc}>
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//               Praesentium hic rem eveniet error possimus, neque ex doloribus.
//             </div>
//             <div className={style.genre}>Action</div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
