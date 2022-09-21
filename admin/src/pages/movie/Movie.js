import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import { useContext } from "react";

export default function Movie() {
  const location = useLocation();
  const movie = location.state;
  const { dispatch } = useContext(MovieContext);
//   console.log("movie",movie);
  
    const [title, setTitle] = useState(movie.title)
    const [releaseDate, setYear] = useState(movie.releaseDate)
    const [genre, setGenre] = useState(movie.genre)
    const [ageRating, setLimit] = useState(movie.ageRating)
    const [portraitImg,setPortraitImg ] = useState(movie.portraitImg)
    const [landscapeImg, setLandscapeImg] = useState(movie.landscapeImg)

    const handleUpdate = (e) => {
        e.preventDefault()
        updateMovie({
            movieId: movie._id,
            movieUpdatedData:{
                title,
                releaseDate,
                genre,
                ageRating,
            }
        }, dispatch)
        
    }
    return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.landscapeImg} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input 
                type="text" 
                value={title}  
                onChange = {(e) => setTitle(e.target.value)}
                />
            <label>Published</label>
            <input type="text" value={releaseDate} onChange = {(e) => {setYear(e.target.value)}}/>
            <label>Genre</label>
            <input type="text" value={genre} onChange = {(e) => setGenre(e.target.value)}/>
            <label>Limit</label>
            <input type="text" value={ageRating} onChange = {(e) => setLimit(e.target.value)}/>
            <label>Portrait Imgage</label>
            <input type="file" placeholder={movie.portraitImg} />
            <label>Landscape Image</label>
            <input type="file" placeholder={movie.landscapeImg} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movie.landscapeImg}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={(e) => {handleUpdate(e)}}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
