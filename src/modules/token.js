const SET_TOKEN = 'SET_TOKEN';
const DEL_TOKEN = 'DEL_TOKEN';

const initialState = {
    userId: '',
    isLogin: false,
}

export const setToken = (userId) => ({
    type: SET_TOKEN,
    payload: {
        userId,
        isLogin: true
    }
})

export const delToken = (userId) => ({
    type: DEL_TOKEN,
    payload: {
        userId,
        isLogin: false
    }
})

function token(state=initialState, action) {
    switch(action.type) {
        case SET_TOKEN:
            return {
                ...state,
                userId: action.payload.userId,
                isLogin: true
            }
        case DEL_TOKEN:
            return {
                ...state,
                userId: action.payload.userId,
                isLogin: false
            }
        default:
            return state;
    }
}

export default token;