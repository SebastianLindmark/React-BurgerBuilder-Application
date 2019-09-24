import React, { useState, useEffect } from 'react'
import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'

import { connect } from 'react-redux'



const burgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);

    const { onInitIngredients } = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);


    const purchaseHandler = () => {

        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        }
    }


    const cancelPurchaseHandler = () => {
        setPurchasing(false);
    }

    const continuePurchaseHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const isPurchasable = (ingredients) => {

        const ingredientCount = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce(((sum, current) => sum + current), 0);

        return ingredientCount > 0;
    }

    let burger = null;
    let orderSummary = null;

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings}
                    ingredientDragged={(event) => { }} />

                <BuildControls

                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    purchasable={isPurchasable(props.ings)}
                    ordered={purchaseHandler}
                    cost={props.price}
                    disabled={props.ings}
                    isAuthenticated={props.isAuthenticated} />
            </Aux>
        )

        orderSummary = (<OrderSummary ingredients={props.ings}
            purchaseCancel={cancelPurchaseHandler}
            purchaseContinue={continuePurchaseHandler}
        ></OrderSummary>)

    }

    return (

        <Aux>
            <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));