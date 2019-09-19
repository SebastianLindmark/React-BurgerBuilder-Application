import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems'

import classes from './SideDrawer.css'

const sideDrawer = (props) => {


    return(
        <div classes={classes.SideDrawer}>
            
            <nav>
                <NavigationItems/>

            </nav>


        </div>
    )



}

export default sideDrawer;