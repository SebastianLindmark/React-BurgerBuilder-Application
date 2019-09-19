import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {

    return (

        <div className={classes.CheckoutSummary}>
            <h1>Yummie!</h1>
            
            <Burger ingredients={props.ingredients}/>
        
            <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>Cancel</Button>
        </div>
    )
}

export default checkoutSummary;