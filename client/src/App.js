import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useParams,  } from 'react-router-dom';
import { useEffect } from 'react';

import './App.scss';
import HomePage from './pages/home/HomePages';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Detail from './pages/detail/Detail';
import DisplayAll from './pages/displayall/DisplayAll';
import Popular from './pages/popular/Popular';



function  App(){

  const user = useSelector( state => state.auth.user)

  return (
    <Routes>
      <Route path="/" element={user ? <HomePage/> : <Login/>} />

      <Route path="/register" element={!user ? <Register /> : <Navigate replace to = "/" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate replace to = "/" /> } />
      <Route path="/movies" element={user ? <HomePage type = "movie"/> : <Navigate replace to = "/Login" />} />
      <Route path="/movies/:genre" element={user ? <DisplayAll type = "movie"/> : <Navigate replace to = "/Login" />} />
      <Route path="/series" element={user ? <HomePage type = "series"/> : <Navigate replace to = "/Login" />} />
      <Route path="/series/:genre" element={user ? <DisplayAll type = "series"/> : <Navigate replace to = "/Login" />} />
      <Route path="/review/:id" element = {user ? <Detail /> : <Navigate replace to = "/Login" />}></Route>
      <Route path="/popular" element={user ? <Popular/> : <Navigate replace to = "/Login" />} />

    </Routes>
  )
}

export default App
