const ORDER_BY_ITEM = 'ORDER_BY_ITEM';
const ORDER_BY_INIT = 'ORDER_BY_INIT';
const ORDER_SHEET = 'ORDER_SHEET';


const initialState = {
    orderList: {

    },
    orderSheetList: {

    }
}

export const orderByInit = (userId) => ({
    type: ORDER_BY_INIT,
    payload: {
        userId
    }
})

export const orderByItem = (userId, itemList, orderDate) => ({
    type: ORDER_BY_ITEM,
    payload: {
        userId,
        itemList,
        orderDate
    }
})

export const orderSheet = (userId, itemList, orderState, orderDate, address, sum, fee, total) => ({
    type: ORDER_SHEET,
    payload: {
        userId,
        itemList,
        orderState,
        orderDate,
        address,
        sum,
        fee,
        total
    }
})


function order(state=initialState, action) {
    switch(action.type) {
        case ORDER_BY_INIT:
            Object.assign(state.orderList, {[action.payload.userId]: []});
            Object.assign(state.orderSheetList, {[action.payload.userId]: []});
            return {
                ...state,
                orderList: state.orderList
            }
        case ORDER_BY_ITEM:
            state.orderList[action.payload.userId] 
                = state.orderList[action.payload.userId]
                    .concat({['ORDER_' + action.payload.userId + state.orderList[action.payload.userId].length] 
                    : action.payload.itemList})
            return {
                ...state,
                orderList: state.orderList
            }
        case ORDER_SHEET:
            state.orderSheetList[action.payload.userId] 
                = state.orderSheetList[action.payload.userId]
                    .concat({[action.payload.orderDate + '_' + action.payload.userId] 
                    : Object.assign({orderState: action.payload.orderState}, {orderDate: action.payload.orderDate}, {address: action.payload.address}, {sum: action.payload.sum}, {fee: action.payload.fee}, {total: action.payload.total}, {itemList: [action.payload.itemList]})})
            return {
                ...state,
                orderSheetList: state.orderSheetList
            }
        
        default:
            return state;
    }
}

export default order;