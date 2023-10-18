const CART_INIT = 'CART_INIT';
const CART_SELECT = 'CART_SELECT';
const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_DEL_ITEM = 'CART_DEL_ITEM';

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
}

export const cartInit = (userId) => ({
    type: CART_INIT,
    payload: {
        userId
    }
})

export const cartSelect = (userId) => ({
    type: CART_SELECT,
    payload: {
        userId
    }
})

export const cartAddItem = (userId, itemId) => ({
    type: CART_ADD_ITEM,
    payload: {
        userId,
        itemId
    }
})

export const cartDelItem = (userId, itemId) => ({
    type: CART_DEL_ITEM,
    payload: {
        userId,
        itemId
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
                userCart: (state.cartList.filter((cart) =>  (cart[0].userId === action.payload.userId)))
            }
        case CART_ADD_ITEM: 
            const cartIndex = state.cartList.findIndex((cart) => cart[0].userId === action.payload.userId);
            const arrayCart = Array.isArray(state.userCart[0]) ? state.userCart[0] : state.userCart;
            const cartItem = arrayCart.concat({cartKey: arrayCart.length, itemId: action.payload.itemId, itemCount: 1});
            state.cartList[cartIndex] = cartItem;
            return {
                ...state,
                userCart: cartItem,
                cartList: state.cartList
            }
        case CART_DEL_ITEM: 
            console.log('del >>>>>>>>>>> ', state.userCart.filter((item) => (item.itemId !== action.payload.itemId)))
            // console.log()
            return {
                
            }
        default:
            return state;
    }

}

export default cart;