import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'

import Cast from './castlistitem/Cast'
import "./castlist.scss"

function CastList({castList}) {

    return (
        
        <div className='castList'>
            {
                castList.map((cast) => (
                    <Cast cast={cast} />
                ))
            }

        </div>
    )
}
export default React.memo(CastList)