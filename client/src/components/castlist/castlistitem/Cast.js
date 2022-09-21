import React from 'react'

import "./cast.scss"

export default function Cast({cast}) {

  return (
    <div className='cast'>
      <img src={cast.imgURL} alt="" />
      <div className='castInfo'>
        <div className='castName'>{cast.name}</div>
        <div className='charactor'>{cast.portrait}</div>
      </div>
    </div>
  )
}
