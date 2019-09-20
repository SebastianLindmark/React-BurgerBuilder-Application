import React, { Component } from 'react'

import classes from './BurgerIngredient.css'

class BurgerIngredient extends Component {


    render() {
        let ingredient = null;

        let hamburgerClass = null;

        switch (this.props.type) {

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

        if (this.props.type === 'bread-top') {
            ingredient = (
                <div draggable className={hamburgerClass}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>)
        } else {
            ingredient = <div draggable onDragStart={this.props.onDragStart} className={hamburgerClass}></div>
        }

        return ingredient;
    }


}


export default BurgerIngredient