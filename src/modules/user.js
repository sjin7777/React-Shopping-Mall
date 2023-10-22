const USER_ID_CK = 'USER_ID_CK'
const USER_CK = 'USER_CK';
const USER_JOIN = 'USER_JOIN';
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_ADD_ADDRESS = 'USER_ADD_ADDRESS';
const USER_DEL_ADDRESS = 'USER_DEL_ADDRESS';
const USER_MAIN_ADDRESS = 'USER_MAIN_ADDRESS';
const USER_MODIFY = 'USER_MODIFY';
const USER_DELETE = 'USER_DELETE';



const initialState = {
    userList: [
        {
            userKey: 1,
            userId: 'admin',
            userPwd: '1234',
            isUserDel: false,
            userAddress: '인천',
            userAddressList: [],
        }
    ],
    userInfo: 
    {
        userKey: 1,
        userId: 'admin',
        userPwd: '1234',
        isUserDel: false,
        userAddress: '인천',
        userAddressList: [],
    }
}



export const userIdCk = (userId) => ({
    type: USER_ID_CK,
    payload: {
        userId,
    }
});
export const userCk = (userId, userPwd) => ({
    type: USER_CK,
    payload: {
        userId,
        userPwd
    }
});
export const userJoin = (userId, userPwd) => ({
    type: USER_JOIN,
    payload: {
        userId,
        userPwd
    }
});
export const userLogin = (userId, userPwd) => ({
    type: USER_LOGIN,
    payload: {
        userId,
        userPwd
    }
});
export const userLogout = (userId) => ({
    type: USER_LOGOUT,
    payload: {
        userId
    }
});
export const userAddAddress = (userId, address) => ({
    type: USER_ADD_ADDRESS,
    payload: {
        userId,
        address
    }
});
export const userDelAddress = (userId, address) => ({
    type: USER_DEL_ADDRESS, 
    payload: {
        userId,
        address
    }
});
export const userMainAddress = (userId, address) => ({
    type: USER_MAIN_ADDRESS,
    payload: {
        userId,
        address
    }
});
export const userModify = (userId, userPwd) => ({
    type: USER_MODIFY,
    payload: {
        userId,
        userPwd
    }
});
export const userDelete = (userId) => ({
    type: USER_DELETE,
    payload: {
        userId
    }
});



function user (state = initialState, action) {
    switch(action.type) {
        case USER_ID_CK:
            return {
                ...state,
                userInfo: {
                    userId: (state.userList.findIndex((user) => user.userId === action.payload.userId) > -1),
                }
            }
        case USER_CK:
            return {
                ...state,
                userInfo: {
                    userId: (state.userList.findIndex((user) => user.userId === action.payload.userId) > -1),
                    userPwd: (state.userList.findIndex((user) => (user.userId === action.payload.userId) && (user.userPwd === action.payload.userPwd)) > -1),
                    isUserDel: (state.userList.findIndex((user) => (user.userId === action.payload.userId) && (user.isUserDel)) > -1)
                }
            }

        case USER_JOIN:
            return {
                ...state,
                userList: state.userList.concat(Object.assign({userKey: state.userList.length + 1}, action.payload, {isUserDel: false}, {address: null}, {addressList: []} ))
            }
        case USER_LOGIN:
            return {
                ...state,
                userInfo: state.userList.filter((user) => (user.userId === action.payload.userId) && (user.userPwd === action.payload.userPwd) && (user.isUserDel === false))
            }
        case USER_LOGOUT:
            return {
                ...state,
                userInfo: {
                    userId: null,
                    userPwd: null
                }
            }
        
        case USER_ADD_ADDRESS:
            state.userList.filter((user) => user.userId === action.payload.userId)[0].addressList = state.userList.filter((user) => user.userId === action.payload.userId)[0].addressList.concat(action.payload.address)
            return {
                ...state,
                userList: state.userList,
                userInfo: state.userList.filter((user) => user.userId === action.payload.userId)[0]
            }
        
        case USER_DEL_ADDRESS:
            state.userList.filter((user) => user.userId === action.payload.userId)[0].addressList = state.userList.filter((user) => user.userId === action.payload.userId)[0].addressList.filter((address) => address !== action.payload.address)
            return {
                ...state,
                userList: state.userList,
                userInfo: state.userList.filter((user) => user.userId === action.payload.userId)[0]
            }
        case USER_MAIN_ADDRESS:
            state.userList.filter((user) => user.userId === action.payload.userId)[0].address = action.payload.address
            return{
                ...state,
                userList: state.userList,
                userInfo: state.userList.filter((user) => user.userId === action.payload.userId)[0]
            }

        case USER_MODIFY:
            state.userList.filter((user) => user.userId === action.payload.userId)[0].userPwd = action.payload.userPwd
            return {
                ...state,
                userList: state.userList,
                userInfo: state.userList.filter((user) => user.userId === action.payload.userId)[0]
            }
        case USER_DELETE:
            state.userList.filter((user) => user.userId === action.payload.userId)[0].isUserDel = true
            return {
                ...state,
                userList: state.userList,
            }
        default:
            return state;
    }
}

export default user;