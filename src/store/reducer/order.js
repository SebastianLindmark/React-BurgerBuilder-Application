import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });

        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            //Using action.orderId instead of action.orderData.name
            
            const newOrder = updateObject(action.orderData, { id: Math.random() * 1000 })

            return updateObject(state, {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            });

        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });

        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { loading: false, orders: action.orders });

        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false });

        default:
            return state;
    }
}

export default reducer;