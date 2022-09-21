import { useContext, useState } from "react";
import "./newMovie.css";
import "../../firebase";
import { getStorage, ref, uploadBytes ,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { Link ,useNavigate } from "react-router-dom";
import { Loop, Update } from "@material-ui/icons";

export default function NewMovie() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [portraitImg, setPortraitImg] = useState(null);
  const [landscapeImg, setLandscapeImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const[id, setId] = useState("")
  const[name, setName] = useState("")
  const[play, setPlay] = useState("")
  const[imgURL, setImgUrl] = useState("")
  const[people, setPerson] = useState([])

  const storage = getStorage();
  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleAddPerson = (e) => {
    e.preventDefault()
    setPerson([...people,{
      id,
      name,
      portrait:play,
      imgURL,
    }])
  }

  const handleRemovePerson = (person) => {
    const newPeople = people.filter((element) => { 
      return element.name !== person.name; 
    });
    setPerson([...newPeople])
  }

 
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = `${new Date().getTime()}_${item.label}_${item.file.name}`;
      const storageRef  = ref(storage,`/items/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, item.file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoading(progress)
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: portraitImg, label: "portraitImg" },
      { file: landscapeImg, label: "landscapeImg" },
    ]);
    setLoading(true )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie({...movie,castList:[...people]}, dispatch);
    navigate('/movies');
  };

  return (
    <div className="newMovie">
      <h1 className="addMovieTitle">New Movie</h1>
  

        <div className="addMovieItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="portraitImg"
            name="portraitImg"
            onChange={(e) => setPortraitImg(e.target.files[0])}
          />
        </div>
        <div className="addMovieItem">
          <label>Title image</label>
          <input
            type="file"
            id="landscapeImg"
            name="landscapeImg"
            onChange={(e) => setLandscapeImg(e.target.files[0])}
          />
        </div>

        <div className="addDesc">
          <label>Description</label>
          <textarea
            type="text"
            name="des"
            onChange={handleChange}
          />
        </div>
     
      <form className="addMovieForm">
        <div className="addMovieItem">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="addMovieItem">
          <label>Age Rating</label>
          <input
            type="text"
            name="ageRating"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Release Date</label>
          <input
            type="text"
            name="releaseDate"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Type?</label>
          <select name="type" id="type" onChange={handleChange}>
            <option value="">choose type</option>
            <option value="movie">movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        <div className="addMovieItem">
          <label>Trailer URL</label>
          <input
            type="text"
            name="trailer"
            onChange={handleChange}
          />
        </div>
        <div className="addMovieItem">
          <label>Upcoming</label>
          <select name="upcoming" id="type" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
    
      </form>
      <form className="addCastForm">
      <div className="addMovieItem">
          <label>CastID</label>
          <input
            type="text"
            name="id"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="addMovieItem">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="addMovieItem">
          <label>Play</label>
          <input
            type="text"
            name="portrait"
            onChange={(e) => setPlay(e.target.value)}
          />
        </div>
        <div className="addMovieItem">
          <label>Play</label>
          <input
            type="text"
            name="imgURL"
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>
        <div className="addPerson">
          <button onClick = {handleAddPerson}>Add</button>
        </div>
        {
          people.map(person => (
            <div style = {{width:"100%"}}>
              {person.id} - {person.name} - {person.portrait} - {person.imgURL}
              <button onClick={e => {
                e.preventDefault()
                handleRemovePerson(person)
              }} style = {{margin: "15px"} }>delete</button>
            </div>
          ))
        }
      </form>
     
        <button className="addMovieButton" onClick={handleSubmit}>
          Create
        </button>

        <button className="addMovieButton" onClick={handleUpload}>
          Upload Image
        </button>

             
          <div className="uploading">
          <Loop /> upload {isLoading}%
          </div>
        
  
  
    </div>
  );
}
