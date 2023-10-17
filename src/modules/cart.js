const CART_INIT = 'CART_INIT';
const CART_CK = 'CART_CK';
const CART_SELECT = 'CART_SELECT';
const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

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

export const cartCk = (userId) => ({
    type: CART_CK,
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

export const cartAddItem = (userId) => ({
    type: CART_ADD_ITEM,
    payload: {
        userId
    }
})

export const cartRemoveItem = (userId) => ({
    type: CART_REMOVE_ITEM,
    payload: {
        userId
    }
})

function cart(state = initialState, action) {
    // console.log('cart_select >>>> ', state.cartList) 
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
        case CART_CK: 
            return {
                
            }
        case CART_SELECT:
            // console.log('cart_select >> cart ', state.cartList.some((cart) => (cart[0].userId === action.payload.userId)))
            console.log('cart_select[0]  >>>> ', state.cartList[0][0]) 
            console.log('cart_select[0] userId >>>> ', state.cartList[0][0].userId) 
            console.log('cart_select[0] itemId >>>> ', state.cartList[0][1].itemId) 
            console.log('cart_select[0] itemCount >>>> ', state.cartList[0][1].itemCount) 
            console.log('cart_select[1] userId >>>> ', state.cartList[1][0].userId) 
            console.log('cart')
            console.log('==============================================================');
            // console.log('some ? >> ', );

            let a = (state.cartList.forEach((cart) =>  cart[0].userId === action.payload.userId))
            
            let b = (state.cartList.forEach((cart) =>  {
                return cart[0].userId === action.payload.userId
            }))

            let c = (state.cartList.forEach((cart) =>  {
                if (cart[0].userId === action.payload.userId) {
                    return [...cart]
                }
            }))
            console.log('a >>>>>>>>>>>> ', a)
            console.log('b >>>>>>>>>>>> ', b)
            console.log('c >>>>>>>>>>>> ', c)
            // let a = state.cartList.((cart) => (cart[0].userId === action.payload.userId));
            // console.log('a', a)
            // a.

            return {
                ...state,
            }
        case CART_ADD_ITEM: 
            return {
                
            }
        case CART_REMOVE_ITEM: 
            return {
                
            }
        default:
            return state;
    }

}

export default cart;