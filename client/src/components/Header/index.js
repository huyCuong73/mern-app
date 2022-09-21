import React from 'react';
import { Typography } from '@material-ui/core';
import {Nav} from "./Nav/Nav"
import logo from "../../assets/img/logo.jpg"

const Header = () => {
    
    return (
        <div>
            <Nav />
        </div>
    );
}

export default React.memo(Header);
