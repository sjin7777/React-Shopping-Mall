const CART_INIT = 'CART_INIT';
const CART_SELECT = 'CART_SELECT';
const CART_REMOVE = 'CART_REMOVE';

const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_DEL_ITEM = 'CART_DEL_ITEM';

const CART_ITEM_AMOUNT_UP = 'CART_ITEM_AMOUNT_UP';
const CART_ITEM_AMOUNT_DOWN = 'CART_ITEM_AMOUNT_DOWN';


const initialState = {
    cartList: {
        admin: [
            {
                cartKey: 'admin' + 0,
                itemId: 1,
                itemAmount: 2,
            },
            {
                cartKey: 'admin' + 1,
                itemId: 4,
                itemAmount: 5,
            },
            {
                cartKey: 'admin' + 2,
                itemId: 2,
                itemAmount: 10,
            }
        ]
    }
};



export const cartInit = (userId) => ({
    type: CART_INIT,
    payload: {
        userId
    }
});
export const cartSelect = (userId) => ({
    type: CART_SELECT,
    payload: {
        userId
    }
});
export const cartRemove = (userId) => ({
    type: CART_REMOVE,
    paylad: {
        userId
    }
});
export const cartAddItem = (userId, itemId) => ({
    type: CART_ADD_ITEM,
    payload: {
        userId,
        itemId
    }
});
export const cartDelItem = (userId, itemId) => ({
    type: CART_DEL_ITEM,
    payload: {
        userId,
        itemId
    }
});
export const cartItemAmountUp = (userId, itemId, itemAmount) => ({
    type: CART_ITEM_AMOUNT_UP,
    payload: {
        userId,
        itemId,
        itemAmount
    }
});
export const cartItemAmountDown = (userId, itemId, itemAmount) => ({
    type: CART_ITEM_AMOUNT_DOWN,
    payload: {
        userId,
        itemId,
        itemAmount
    }
});



function cart(state = initialState, action) {
    switch(action.type) {
        case CART_INIT: 
            return {
                ...state,
                cartList: Object.assign(state.cartList, {[action.payload.userId]: []})
            }
        case CART_SELECT:
            return {
                ...state,
                [action.payload.userId]: state.cartList[action.payload.userId]
            }
        case CART_REMOVE:
            delete state[action.paylad.userId];
            return {
                ...state,
            }

        case CART_ADD_ITEM: 
            state.cartList[action.payload.userId] = state.cartList[action.payload.userId].concat({cartKey: action.payload.userId + state.cartList[action.payload.userId].length, itemId: action.payload.itemId, itemAmount: 1});
            return {
                ...state,
                cartList: state.cartList,
                [action.payload.userId]: state.cartList[action.payload.userId],
            }
        case CART_DEL_ITEM: 
            state.cartList[action.payload.userId] = state.cartList[action.payload.userId].filter((item) => item.itemId !== action.payload.itemId);
            return {
                ...state,
                cartList: state.cartList,
                [action.payload.userId]: state.cartList[action.payload.userId],
            }

        case CART_ITEM_AMOUNT_UP:
            state.cartList[action.payload.userId] = state.cartList[action.payload.userId].map((item) => (item.itemId === action.payload.itemId) ? {...item, itemAmount: action.payload.itemAmount + 1} : item)
            return {
                ...state,
                cartList: state.cartList,
                [action.payload.userId]: state.cartList[action.payload.userId],
            }
        case CART_ITEM_AMOUNT_DOWN:
            state.cartList[action.payload.userId] = state.cartList[action.payload.userId].map((item) => (item.itemId === action.payload.itemId) ? {...item, itemAmount: action.payload.itemAmount - 1} : item)
            return {
                ...state,
                cartList: state.cartList,
                [action.payload.userId]: state.cartList[action.payload.userId],
            }
        default:
            return state;
    }
}

export default cart;