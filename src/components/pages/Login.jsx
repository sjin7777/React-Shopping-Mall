import { useState } from "react";
import { useNavigate } from "react-router";
import { connect, shallowEqual, useSelector } from "react-redux";

import { userCk, userLogin  } from "../../modules/user";
import { cartSelect } from "../../modules/cart";
import { setToken } from "../../modules/token";

import { Button, TextField } from "@mui/material";

const ReduxState = (state) => ({
    userId: state.userId,
    userPwd: state.userPwd,
    isUserDel: state.isUserDel
})

const ReduxAction = (dispatch) => ({
    userCk: (userId, userPwd) => dispatch(userCk(userId, userPwd)),
    userLogin: (userId, userPwd) => dispatch(userLogin(userId, userPwd)),
    setToken: (userId) => dispatch(setToken(userId)),
    cartSelect: (userId) => dispatch(cartSelect(userId))
})


function Login({userCk, userLogin, setToken, cartSelect}) {
    const navigate = useNavigate();
    const storeUser = useSelector((state) => ({user: state.user}), shallowEqual).user;
    const storeUserIdCk = storeUser.userInfo.userId;
    const storeUserPwdCk = storeUser.userInfo.userPwd;
    const storeUserIsDel = storeUser.userInfo.isUserDel
    
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
                if(storeUserPwdCk && !storeUserIsDel) {
                    setMsg("로그인");
                    userLogin(userId, userPwd)
                    setToken(userId)
                    cartSelect(userId)
                    navigate("/")
                } else if(storeUserIsDel) {
                    setMsg("탈퇴한 계정입니다.")
                } else if(!storeUserPwdCk) {
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
                <TextField type="text" label="ID" variant="standard" value={userId} onChange={onUserIdHandler} style={{display: "block"}} />
                <TextField type="password" label="Password" variant="standard" value={userPwd} onChange={onUserPwdHandler} style={{display: "block"}} />
                <Button type="submit" variant="outlined" color="success" onClick={() => userCk(userId, userPwd)} style={{marginTop: "20px", width: "200px"}}>로그인</Button>
            </form>
            <div onChange={onChangeMsg}>{msg}</div>
        </>
    )
}

export default connect(ReduxState, ReduxAction)(Login);