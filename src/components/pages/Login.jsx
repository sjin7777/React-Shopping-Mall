import { useState } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { userCk, userLogin  } from "../../modules/user";
import { cartSelect } from "../../modules/cart";
import { setToken } from "../../modules/token";
import { useNavigate } from "react-router";

const ReduxState = (state) => ({
    userId: state.userId,
    userPwd: state.userPwd
})

const ReduxAction = (dispatch) => ({
    userCk: (userId, userPwd) => dispatch(userCk(userId, userPwd)),
    userLogin: (userId, userPwd) => dispatch(userLogin(userId, userPwd)),
    setToken: (userId) => dispatch(setToken(userId)),
    cartSelect: (userId) => dispatch(cartSelect(userId))
})


function Login({userCk, userLogin, setToken, cartSelect}) {
    const navigate = useNavigate();
    const storeUser = useSelector((state) => ({user: state.user.userInfo}), shallowEqual).user;
    const storeUserIdCk = storeUser.userId;
    const storeUserPwdCk = storeUser.userPwd;

    const [ userId, setUserId ] = useState("");
    const [ userPwd, setUserPwd ] = useState("");
    const [ msg, setMsg ] = useState("")
    const onUserIdHandler = (e) => setUserId(e.target.value);
    const onUserPwdHandler = (e) => setUserPwd(e.target.value);
    const onChangeMsg = (e) => setMsg(e.target.value);

    const onSubmitHandler = (e) => {
        if(!userId) setMsg("아이디를 입력해주세요")
        else if(!userPwd) setMsg("패스워드를 입력해주세요")
        else {
            if(storeUserIdCk) {
                if(storeUserPwdCk) {
                    setMsg("로그인");
                    userLogin(userId, userPwd)
                    setToken(userId)
                    cartSelect(userId)
                    navigate("/")
                } else {
                    setMsg("비밀번호가 일치하지 않습니다")
                }
            } else {
                setMsg("아이디가 존재하지 않습니다")
            }
        }
        e.preventDefault();
    }


    return (
        <>
            <h1>로그인</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>아이디</label>
                    <input type="text" value={userId} onChange={onUserIdHandler}/>
                </div>
                <div>
                    <label>패스워드</label>
                    <input type="password" value={userPwd} onChange={onUserPwdHandler}/>
                </div>     
                <button type="submit" onClick={() => userCk(userId, userPwd)}>로그인</button>
            </form>
            <div onChange={onChangeMsg}>{msg}</div>
        </>
    )
}

export default connect(ReduxState, ReduxAction)(Login);