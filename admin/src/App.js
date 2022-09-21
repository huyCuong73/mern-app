import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListList from "./pages/listList/ListList";
import NewList from "./pages/newList/NewList";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import { Layout } from "./Layout";


function App() {

  const {user} = useContext(AuthContext)
  
  return (
    <>
      <Routes>
        <Route path="/login" element = {!user ? <Login /> : <Navigate replace to = "/"/> }/>
        
        <Route path="/" element = { user ? <Layout><Home/></Layout> : <Navigate replace to = "/login" />} />

        <Route path="/users" element = { user ? <Layout><UserList/></Layout> : <Navigate replace to = "/login" />} />
          
        <Route path="/user/:userId" element = { user ? <Layout><User/></Layout> : <Navigate replace to = "/login" />} />
          
        <Route path="/newUser" element = { user ? <Layout><NewUser/></Layout> : <Navigate replace to = "/login" />} />
          
        <Route path="/movies" element = { user ? <Layout><MovieList/></Layout> : <Navigate replace to = "/login" />} />

        <Route path="/movies" element = { user ? <Layout><MovieList/></Layout> : <Navigate replace to = "/login" />} />

        <Route path="/movie/:movieId" element = { user ? <Layout><Movie/></Layout> : <Navigate replace to = "/login" />} />

        <Route path="/newMovie" element = { user ? <Layout><NewMovie/></Layout> : <Navigate replace to = "/login" />} />
      
        <Route path="/lists" element = { user ? <Layout><ListList/></Layout> : <Navigate replace to = "/login" />} />
        
        <Route path="/list/:listId" element = { user ? <Layout><List/></Layout> : <Navigate replace to = "/login" />} />
        
        <Route path="/newList" element = { user ? <Layout><NewList/></Layout> : <Navigate replace to = "/login" />} />
          
      </Routes>
    </>
  );
}

export default App;