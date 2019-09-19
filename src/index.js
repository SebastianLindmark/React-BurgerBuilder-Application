import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';


import authReducer from './store/reducer/auth'
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order'
import thunk from 'redux-thunk'




const composeEnhancers = process.env.NODE_ENV === 'development ' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    order : orderReducer,
    auth : authReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

/*const logger = store => {
    return next => {
        return action => {
            console.log("MIDDLEWARE, dispatching ", action)
            const result = next(action);
            console.log("MIDDLEWARE, next state ", store.getState())
            return result;
        }
    }
}*/


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
