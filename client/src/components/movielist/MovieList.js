import {
    ArrowBackIosOutlined,
    ArrowForwardIos,
    ArrowForwardIosOutlined,
  } from "@material-ui/icons";
  import { MdArrowForwardIos } from "react-icons/md";
  import { useRef, useState } from "react";
  import ListItem from "./listitem/ListItem";
  import "./movielist.scss";
  
  export default function List({list}) {
    
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    
    const listRef = useRef();
    
    const handleClick = (direction) => {
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x - 60;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 5) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    };
    return (
      <div className="list">
        <div className="listTitle">
            <div className="listName">{list.title}</div>
            <MdArrowForwardIos className="listArrow"/>
            
        </div>
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="filmContainer">

            <div className="container" ref={listRef}>
              {
                  list.content.map((item, i) => (
                      <ListItem index = {i} item = {item}/>
                  ))
              }
            </div>
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
  }
  





















// import style from "./movielist.module.scss"
// import clsx from "clsx"
// import ListItem from "./listitem/ListItem"
// import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
// import React,{useState,useRef} from 'react'

// export default function MovieList() {

//     const [isMoved, setIsMoved] = useState(false);
//     const [slideNumber, setSlideNumber] = useState(0);
  
//     const listRef = useRef();
  
//     const handleClick = (direction) => {
//       setIsMoved(true);
//       let distance = listRef.current.getBoundingClientRect().x - 50;
//       if (direction === "left" && slideNumber > 0) {
//         setSlideNumber(slideNumber - 1);
//         listRef.current.style.transform = `translateX(${230 + distance}px)`;
//       }
//       if (direction === "right" && slideNumber < 5) {
//         setSlideNumber(slideNumber + 1);
//         listRef.current.style.transform = `translateX(${-230 + distance}px)`;
//       }
//     };
//   return (
//     <div className = {style.list}>
//         <span className ={style.listTitle}>
//             Continue to watch
//         </span>
//         <div className={style.wrapper}>
//             <ArrowBackIosOutlined 
//                 className={clsx(style.sliderArrow,style.left)}
//                 onClick={() => handleClick("left")}
//                 style={{ display: !isMoved && "none" }}
//             />
//                 <div className= {style.container}  ref={listRef}>
//                     <ListItem index = {1} />
//                     <ListItem index = {2} />
//                     <ListItem index = {3} />
//                     <ListItem index = {4} />
//                     <ListItem index = {5} />
//                     <ListItem index = {6} />
//                     <ListItem index = {7} />
//                     <ListItem index = {8} />
//                     <ListItem index = {9} />

//                 </div>
//             <ArrowForwardIosOutlined 
//                 className={clsx(style.sliderArrow,style.right)}
//                 onClick={() => handleClick("right")}
//                 // style={{ display: !isMoved && "none" }}
//             />
//         </div>
//     </div>
//   )
// }
