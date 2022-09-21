import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import {logout} from "../../context/authContext/AuthActions"

export default function Topbar() {
  const {dispatch} = useContext(AuthContext)
  
  return (

    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <button className="topbarIconContainer" onClick={() => dispatch(logout())}>
            Log out
          </button>
          <img src="" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
