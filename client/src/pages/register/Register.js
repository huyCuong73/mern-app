import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from './register.module.scss';
import logo from "../../assets/img/tmdb.svg"
import * as actions from '../../redux/actions/auth'
import axios from "axios"
import { useDispatch } from "react-redux";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const [data, setData] = useState({})

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `https://react-rating-app-thc.herokuapp.com/api/auth/register`,
        {
          email,
          username,
          password
        }
      );
      setData(res.data)
      if(res.status == 201){
        dispatch(actions.loginRequest({
          email,
          password
        }))
      }
    } catch (err) {
      console.log(err);
    } 
  }

  return (
    <div className={style.register}>
      <div className={style.top}>
        <div className={style.wrapper}>
          <img
            className={style.logo}
            src={logo}
            alt=""
          />
          <button className={style.loginButton}>
            <Link to = "/login" className="loginBtn link">
              <span>Sign In</span> 
            </Link>
          </button>
              
        </div>
      </div>
      <div className={style.container}>

          <div className={style.input}>
            <h3>Email address:</h3>
            <input type="email"  onChange={(e) => setEmail(e.target.value)} />
            <h3>Username:</h3>
            <input type="username" onChange={(e) => setUsername(e.target.value)} />
            <h3>Password:</h3>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            {
              (!email || ! username || !password) ? 
                <>
                  <span style = {{color:"red"}}>you have to fill in all fields</span>
                  <button className={style.registerButtonDisabled} disabled>
                    Get Started
                  </button>
                </>
                :
                <>
                  <button className={style.registerButton} onClick = {() => {
                    handleRegister()
                    setData(null)
                  }}>
                    Get Started
                  </button>                
                </>
            }


            {
              !data && <span>Loading..</span>
            }
            

          </div>


        
        
      </div>
    </div>
  );
}
