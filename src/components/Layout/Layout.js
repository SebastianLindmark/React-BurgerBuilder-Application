import React from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux';

const layout = (props) => (
    <Aux>
        <Toolbar isAuth={props.isAuthenticated}/>
        <SideDrawer/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    };
}

export default connect(mapStateToProps)(layout)