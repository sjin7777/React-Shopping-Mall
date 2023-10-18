const CART_INIT = 'CART_INIT';
const CART_SELECT = 'CART_SELECT';
const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_DEL_ITEM = 'CART_DEL_ITEM';
const CART_ITEM_COUNT_UP = 'CART_ITEM_COUNT_UP';
const CART_ITEM_COUNT_DOWN = 'CART_ITEM_COUNT_DOWN';

const initialState = {
    cartList: [
        [
            {
                userId: 'admin'
            },
            {
                cartKey: 1,
                itemId: 1,
                itemCount: 2,
            },
            {
                cartKey: 2,
                itemId: 4,
                itemCount: 5,
            },
            {
                cartKey: 3,
                itemId: 2,
                itemCount: 10,
            }
        ]
    ],
    userCart: [
        {
            userId: 'admin'
        },
        {
            cartKey: 1,
            itemId: 1,
            itemCount: 2,
        }
    ]
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

export const cartItemCountUp = (userId, itemId, itemCount) => ({
    type: CART_ITEM_COUNT_UP,
    payload: {
        userId,
        itemId,
        itemCount
    }
});

export const cartItemCountDown = (userId, itemId, itemCount) => ({
    type: CART_ITEM_COUNT_DOWN,
    payload: {
        userId,
        itemId,
        itemCount
    }
})

function cart(state = initialState, action) {
    switch(action.type) {
        case CART_INIT: 
            return {
                ...state,
                userCart: [
                    {
                        userId: action.payload.userId
                    }
                ],
                cartList: state.cartList.concat([[{userId: action.payload.userId}]])
            }
        case CART_SELECT:
            return {
                ...state,
                userCart: (state.cartList.filter((cart) => (cart[0].userId === action.payload.userId)))
            }

        case CART_ADD_ITEM: 
            const addUserIndex = state.cartList.findIndex((cart) => cart[0].userId === action.payload.userId);
            const addUserArrayCart = Array.isArray(state.userCart[0]) ? state.userCart[0] : state.userCart;
            const addUserCart = addUserArrayCart.concat({cartKey: addUserArrayCart.length, itemId: action.payload.itemId, itemCount: 1});
            state.cartList[addUserIndex] = addUserCart;
            return {
                ...state,
                userCart: addUserCart,
                cartList: state.cartList
            }
        case CART_DEL_ITEM: 
            const delUserIndex = state.cartList.findIndex((cart) => cart[0].userId === action.payload.userId);
            const delUserArrayCart = Array.isArray(state.userCart[0]) ? state.userCart[0] : state.userCart;
            const delUserCart = delUserArrayCart.filter((cart) => cart.itemId !== action.payload.itemId)
            state.cartList[delUserIndex] = delUserCart;
            return {
                ...state,
                userCart: delUserCart,
                cartList: state.cartList
            }

        case CART_ITEM_COUNT_UP:
            const upUserIndex = state.cartList.findIndex((cart) => cart[0].userId === action.payload.userId);
            const upUserArrayCart = Array.isArray(state.userCart[0]) ? state.userCart[0] : state.userCart;
            const upUserItemIndex = upUserArrayCart.findIndex((item) => item.itemId === action.payload.itemId);
            upUserArrayCart[upUserItemIndex].itemCount += 1
            state.cartList[upUserIndex][upUserItemIndex].itemCount = upUserArrayCart[upUserItemIndex].itemCount
            
            return {
                ...state,
                userCart: state.userCart,
                cartList: state.cartList
            }
        case CART_ITEM_COUNT_DOWN:
            const downUserIndex = state.cartList.findIndex((cart) => cart[0].userId === action.payload.userId);
            const downUserArrayCart = Array.isArray(state.userCart[0]) ? state.userCart[0] : state.userCart;
            const downUserItemIndex = downUserArrayCart.findIndex((item) => item.itemId === action.payload.itemId);
            downUserArrayCart[downUserItemIndex].itemCount -= 1
            state.cartList[downUserIndex][downUserItemIndex].itemCount = upUserArrayCart[upUserItemIndex].itemCount
            
            return {
                ...state,
                userCart: state.userCart,
                cartList: state.cartList
            }
        default:
            return state;
    }

}

export default cart;