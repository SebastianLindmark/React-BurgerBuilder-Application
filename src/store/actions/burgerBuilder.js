import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    
    const newOrderIngredients = {

        "bread-top":  ingredients['bread-top'],
        "salad" : ingredients['salad'],
        "bacon" : ingredients['bacon'],
        "cheese" : ingredients['cheese'],
        "meat" : ingredients['meat'],
        "bread-bottom": ingredients['bread-bottom']
    }
    console.log(ingredients);
    
    
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: newOrderIngredients
    }
}

export const initIngredients = () => {

    return dispatch => {
        axios.get("/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(err => {
                console.log("Failed", err);
                dispatch(fetchIngredientsFailed());
            })
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}