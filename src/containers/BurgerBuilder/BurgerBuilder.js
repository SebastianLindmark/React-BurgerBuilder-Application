import React, { Component } from 'react'
import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'

import { connect } from 'react-redux'



export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {

        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }


    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    isPurchasable = (ingredients) => {

        const ingredientCount = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce(((sum, current) => sum + current), 0);

        return ingredientCount > 0;
    }

    render() {

        let burger = null;
        let orderSummary = null;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}
                        ingredientDragged={(event) => { }} />

                    <BuildControls

                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.isPurchasable(this.props.ings)}
                        ordered={this.purchaseHandler}
                        cost={this.props.price}
                        disabled={this.props.ings}
                        isAuthenticated={this.props.isAuthenticated} />
                </Aux>
            )

            orderSummary = (<OrderSummary ingredients={this.props.ings}
                purchaseCancel={this.cancelPurchaseHandler}
                purchaseContinue={this.continuePurchaseHandler}
            ></OrderSummary>)

        }

        return (

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));