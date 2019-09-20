import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    
    let convertedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            console.log(i);
            return <BurgerIngredient key={igKey + i} type= {igKey} onDragStart={(event) => onDragStart(event,i)}/>
        }
        )
    }).reduce( (arr,el) => {
        return arr.concat(el);
    }, [])

    if(convertedIngredients.length === 0){
        convertedIngredients = <p>Add ingredients</p>
    }


    const onDragStart = (event,index) => {
        event.dataTransfer.setData('id', index);
        props.ingredientDragged(event);
        console.log("Detected on drag start from index " , index);
    }


    return (
        <div className={classes.Burger}>
            {convertedIngredients}
        </div>

    )

}

export default burger;