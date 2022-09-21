import clsx from 'clsx';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions/auth'
import logo from "../../assets/img/tmdb.svg"

import style from "./login.module.scss";

export default function Login() {
  const user = useSelector(state => state.auth)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleLoading, setToggleLoading] = useState(false)

  const dispatch = useDispatch()

  if(user.err){
    setToggleLoading(false)  
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setToggleLoading(true)
    dispatch(actions.loginRequest({
      email,
      password
    }))}
  
  return (
    <div className = {style.login}>
      <div className = {style.top}>
        <div className = {style.wrapper}>
          <img
            className = {style.logo}
            src={logo}
            alt=""
          />
        </div>
      </div>
      <div className = {style.container}>
        <form>
          <h1>Sign In</h1>
          <input 
            type="email" 
            placeholder="Email or phone number" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className = {style.loginButton}
            onClick={handleLogin}
          >
              Sign In
          </button>
          {
            toggleLoading &&  <h4>Logging in...</h4>
          }
          {
            user.err &&  <h4>Wrong username or password.</h4>
          }
          <Link to = "/register" className= {clsx('link')}>
            <button className = {style.signupButton}>

              <b>Sign up</b>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
