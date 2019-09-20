
import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css'



const controls = [
    { label: "Top bread", type: "bread-top" },
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" },
    { label: "Bottom bread", type: "bread-bottom" }
];


const buildControls = (props) => {



    return <div className={classes.BuildControls}>
        <p>Cost {props.cost}</p>
        
        {controls.map(control => {
            return <BuildControl 
                key={control.label} 
                label={control.label} 
                added={() => {props.ingredientAdded(control.type)}}
                removed={() => {props.ingredientRemoved(control.type)}}
                disabled={!props.disabled[control.type]} />
        })}


        

        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>

    </div>

}

export default buildControls;