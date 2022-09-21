import { Visibility } from "@material-ui/icons";
import axios from "axios"

import "./widgetSm.css";
import { useEffect } from "react";
import { useState } from "react";

export default function WidgetSm() {

  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("https://react-rating-app-thc.herokuapp.com/api/users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDg0MWU0OTA2ZmIxZmM4MjIzZjJlZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MzExODg0NiwiZXhwIjoxNjYzOTgyODQ2fQ.KUZkRtZf3vixAt5YdVecIHOa95EOV9DHDrab0KHuQKY",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  console.log(newUsers);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user.picture ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
