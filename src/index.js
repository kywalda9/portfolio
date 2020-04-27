import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

// const loadedState = {
//     ingredients: {
//         salad: 0,
//         bacon: 0,
//         cheese: 0,
//         meat: 0
//     },
//     totalPrice: 4,
// }


// let store = null;
// function loadState () {
//        let tempState = new Object();
//        console.log('loadState '+tempState);
//        axios.get( 'https://react-my-burger-b31c5.firebaseio.com/ingredients.json' )
//             .then( response => {
//                 tempState.ingredients = response.data
//                 const ingredients = response.data;
//                 const reducer = (accumulator, currentValue) => accumulator + currentValue;
//                 let sum = Object.keys( ingredients )
//                 .map( igKey => {
//                     return INGREDIENT_PRICES[igKey] * ingredients[igKey];
//                 } ).reduce(reducer);
//                 tempState.totalPrice = loadedState.totalPrice + parseFloat(sum.toFixed( 2 ));
//                 console.log(tempState.ingredients);
//                 console.log(tempState.totalPrice);
//                 store = createStore(reducer, tempState);                
//             } )
//             .catch( error => {
//                 store = createStore(reducer);                
//             } );             
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
) );

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
