import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// sync part
export const purchaseBurgerSuccess = (id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

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

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


// sync part order
export const fetchOrdersSuccess = (orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

//async part
export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth='+token)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
};
