const USER_ID_CK = 'USER_ID_CK'
const USER_CK = 'USER_PWD_CK';

const USER_JOIN = 'USER_JOIN';
const USER_LOGIN = 'USER_LOGIN';

const USER_MODIFY = 'USER_MODIFY';
const USER_DELETE = 'USER_DELETE';


const initialState = {
    userList: [
        {
            userKey: 1,
            userId: 'admin',
            userPwd: '1234',
            isUserDel: false
        }
    ],

    userInfo: 
    {
        userKey: 0,
        userId: '',
        userPwd: '',
        isUserDel: false
    }
}

export const userIdCk = (userId) => ({
    type: USER_ID_CK,
    payload: {
        userId,
    }
})

export const userCk = (userId, userPwd) => ({
    type: USER_CK,
    payload: {
        userId,
        userPwd
    }
})

export const userJoin = (userId, userPwd) => ({
    type: USER_JOIN,
    payload: {
        userId,
        userPwd
    }
})

export const userLogin = (userId, userPwd) => ({
    type: USER_LOGIN,
    payload: {
        userId,
        userPwd
    }
})

export const userModify = (userId) => ({
    type: USER_MODIFY,
    payload: {
        userId
    }
})

export const userDelete = (userId) => ({
    type: USER_DELETE,
    payload: {
        userId
    }
})


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
                    userPwd: (state.userList.findIndex((user) => (user.userId === action.payload.userId) && (user.userPwd === action.payload.userPwd)) > -1)
                }
            }

        case USER_JOIN:
            return {
                ...state,
                userList: state.userList.concat(Object.assign({userKey: state.userList.length + 1}, action.payload, {isUserDel: false}))
            }
        case USER_LOGIN:
            // console.log('login >>>>>>>>>>>>>>>>>>>>> [', action.payload.userId, ', ', action.payload.userPwd, ']')
            console.log('action.payload >>>>>>>>> ', action.payload)
            return {
                ...state,
                // userInfo: action.payload
            }

        case USER_MODIFY:
            return {

            }
        case USER_DELETE:
            return {

            }
        default:
            return state;
    }
}

export default user;