import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import {MdArrowDropDown, MdNotifications } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import clsx from "clsx"

import logo from "../../../assets/img/tmdb.svg"
import style from "./Nav.module.scss"
import { logout } from '../../../redux/actions/auth';
import { getSearchRequest } from '../../../redux/actions/search';
import SearchItems from '../../searchitems/SearchItems';
import { ArrowDropDown, Notifications, Search } from '@mui/icons-material';

export const Nav = () => {
  const location = useLocation();
  const searchItems = useSelector(state => state.search.items)
  const user = useSelector(state => state.auth.user.username)
  const { pathname } = location;

  const splitLocation = pathname.split("/");
  const [searchValue, setSearchValue] = useState(null)
  const dispatch = useDispatch()
  const [scroll, setScroll] = useState(false);
  window.onscroll = () => {
    setScroll(window.pageYOffset === 0 ? false : true)
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear()
  }

  return (
    <div className={scroll ? clsx(style.bar, style.scrolled) : style.bar}>
      {searchValue && <SearchItems movies = {searchItems}/>}
      <div className= {style.navContainer}>
        <div className={style.left}>

          <img className= {style.logo} src={logo} alt="" />
          <Link to = "/" state={{ data: null }}className= {splitLocation[1] === "" ? "link active" : "link"}>
            <span>HomePage</span>
          </Link>
          <Link to = "/series" state={{ data: null }} className= {splitLocation[1] === "series" ? "link active" : "link"}>
            <span>Series</span>        
          </Link>
          <Link to = "/movies" state={{ data: null }} className={splitLocation[1] === "movies" ? "link active" : "link"}>
            <span>Movies</span>        
          </Link>        
          <Link to = "/popular" state={{ data: null }} className={splitLocation[1] === "popular" ? "link active" : "link"}>
            <span>Popular</span>        
          </Link>      
          <span>My List</span>    

        </div>

        <div className= {style.right}>
          <div className={style.navSearch}>
            <input type="text" onChange={(e) => {
              setSearchValue(e.target.value)
              dispatch(getSearchRequest(e.target.value))
            }}/>
            <Search  className={style.iconSearch}/>
          </div>
          
          <Notifications className={style.icon}/>
          <span className={style.userName}>{user}</span>
          <img src= "https://picsum.photos/100/200" alt = ''/>
          <div className={style.profile}>
            <ArrowDropDown  className={style.icon}/>
            <div className={style.options}>
              <span>Settings</span>
              <span onClick = {handleLogout}>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}


