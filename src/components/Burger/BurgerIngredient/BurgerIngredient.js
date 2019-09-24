import React from 'react'

import classes from './BurgerIngredient.css'

const burgerIngredient = props => {


    let ingredient = null;

    let hamburgerClass = null;

    switch (props.type) {

        case ('bread-bottom'):
            hamburgerClass = classes.BreadBottom
            break;
        case ('bread-top'):
            hamburgerClass = classes.BreadTop
            break;
        case ('meat'):
            hamburgerClass = classes.Meat;
            break;
        case ('cheese'):
            hamburgerClass = classes.Cheese;
            break;
        case ('bacon'):
            hamburgerClass = classes.Bacon;
            break;
        case ('salad'):
            hamburgerClass = classes.Salad;
            break;
        default:
            ingredient = null;

    }

    if (props.type === 'bread-top') {
        ingredient = (
            <div draggable className={hamburgerClass}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>)
    } else {
        ingredient = <div draggable onDragStart={props.onDragStart} className={hamburgerClass}></div>
    }

    return ingredient;



}


export default burgerIngredient