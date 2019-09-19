import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    let convertedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => 
            <BurgerIngredient key={igKey + i} type= {igKey}/>
        )
    }).reduce( (arr,el) => {
        return arr.concat(el);
    }, [])

    if(convertedIngredients.length === 0){
        convertedIngredients = <p>Add ingredients</p>
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {convertedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>

    )

}

export default burger;