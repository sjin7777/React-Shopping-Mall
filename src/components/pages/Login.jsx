import { useState } from "react";
import { useNavigate } from "react-router";
import { connect, shallowEqual, useSelector } from "react-redux";

import { userCk, userLogin  } from "../../modules/user";
import { cartSelect } from "../../modules/cart";
import { setToken } from "../../modules/token";

import { Button, TextField } from "@mui/material";
import TransitionsModal from "../ui/Modal";

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
    // const onChangeMsg = (e) => setMsg(e.target.value);
    
    const [ modal, setModal ] = useState(false);
    const onCloseModal = () => setModal(false);
    

    const onSubmitHandler = (e) => {
        setModal(true)
        if(!userId) setMsg("아이디를 입력해주세요")
        else if(!userPwd) setMsg("패스워드를 입력해주세요")
        else {
            if(storeUserIdCk) {
                if(storeUserPwdCk && !storeUserIsDel) {
                    setMsg("로그인되었습니다");
                    userLogin(userId, userPwd)
                    setToken(userId)
                    cartSelect(userId)
                    setTimeout(() => navigate("/"), [1000])
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
        <div style={{ textAlign: 'center', margin: '50px'}}>
            <h1>로그인</h1>
            <form onSubmit={onSubmitHandler}>
                <TextField type="text" label="ID" variant="standard" value={userId} onChange={onUserIdHandler} style={{width: "300px"}} /><br />
                <TextField type="password" label="Password" variant="standard" value={userPwd} onChange={onUserPwdHandler} style={{width: "300px"}}/><br />
                <Button type="submit" variant="outlined" color="success" onClick={() => userCk(userId, userPwd)} style={{marginTop: "20px", width: "300px"}}>로그인</Button>
            </form>
            <TransitionsModal modal={modal} onCloseModal={onCloseModal} msg={msg}/>
            {/* <div onChange={onChangeMsg}>{msg}</div> */}
        </div>
    )
}

export default connect(ReduxState, ReduxAction)(Login);