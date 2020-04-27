import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// sync part
export const purchaseBurgerSuccess = (id, orderData ) => {
    return {
        type: actionTypes.PUCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PUCHASE_BURGER_FAIL,
        error: error
    };
};


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PUCHASE_BURGER_START
    }
    
}

//async part
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData )
        .then( response => {
            console.log('Response data id '+ response.data.name);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));

        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );
    }
};
