import { useContext, useEffect, useState } from "react";
import "./newList.css";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState({});
  console.log("list content",list.content);
  const navigate = useNavigate()

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);


  useEffect(() => {
    getMovies(dispatchMovie);
    list.content = []
  }, [dispatchMovie]);

  const hasBeenSelected = (id) => {
    if(list.content){
      for(let i = 0; i < list.content.length; i++){
        if (id === list.content[i])
        return true
      }
    }
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    
    const newContent = [...list.content,e]
    console.log("newContent",newContent);
    setList({ ...list, content: [...newContent] });
  };

  const handleRemoveSelection = (e) => {
    const newList = list.content.filter((ele) => { 
      return ele !== e; 
  });
    setList({ ...list, content: [...newList] })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate("/lists")
  };

  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New List</h1>
      <form className="addMovieForm">
        <div className="formLeft">
          <div className="addMovieItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addMovieItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addMovieItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
        <label>Content</label>
          <div className="addMovieItem pickMovies">
            

              {movies.map((movie,i) => (
                <div className="listItem">
                  <div key={movie._id} value={movie._id}>
                    {movie.title}
                  </div>
                  {
                    !hasBeenSelected(movie._id)
                    ?
                    <button onClick={(e) => {
                      e.preventDefault()
                      handleSelect(movie._id)}
                    }> add </button> 
                    : 
                    <button onClick={(e) => {
                      e.preventDefault()
                      handleRemoveSelection(movie._id)}
                    }> remove </button> 
                    
                  }

                </div>
              ))}
      
          </div>
        </div>
        <button className="addMovieButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
