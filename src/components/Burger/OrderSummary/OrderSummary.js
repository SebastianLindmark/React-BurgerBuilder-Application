import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'
const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span>{igKey}:</span> {props.ingredients[igKey]}</li>
        }

        );

    return (
        <Aux>

            <h3>Your order</h3>
            <p>With the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>


            <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
            
        </Aux>
    )
}

export default orderSummary;