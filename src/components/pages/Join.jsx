import { useEffect, useState } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";

import { userIdCk, userJoin } from "../../modules/user";
import { cartInit } from "../../modules/cart";
import { useNavigate } from "react-router";
import { orderByInit } from "../../modules/order";

import { Button, TextField } from "@mui/material";
import TransitionsModal from "../ui/Modal";



const ReduxState = (state) => ({
    userId: state.userId,
    userPwd: state.userPwd
})

const ReduxAction = (dispatch) => ({
    userIdCk: (userId) => dispatch(userIdCk(userId)),
    userJoin: (userId, userPwd) => dispatch(userJoin(userId, userPwd)),
    cartInit: (userId) => dispatch(cartInit(userId)),
    orderByInit: (userId) => dispatch(orderByInit(userId))
})


let isIdCk = false;
function Join({userIdCk, userJoin, cartInit, orderByInit}) {
    const navigate = useNavigate();
    const storeUserIdCk = useSelector((state) => ({user: state.user.userInfo}), shallowEqual).user.userId;
    
    const [ userId, setUserId ] = useState("");
    const [ userPwd, setUserPwd ] = useState("");
    const [ userPwdCk, setUserPwdCk ] = useState("");
    const [ msg, setMsg ] = useState("");
    const [ modal, setModal ] = useState(false);
    const onCloseModal = () => setModal(false);

    
    const onUserPwdHandler = (e) => setUserPwd(e.target.value);
    const onUwerPwdCkHandler = (e) => setUserPwdCk(e.target.value);
    // const onChangeMsg = (e) => setMsg(e.target.value);
    const onUserIdHandler = (e) => {
        setUserId(e.target.value);
        isIdCk = false;
        setMsg("");
    }

    useEffect(() => {
        if(isIdCk) {
            if(userId && userId.trim().length !== 0) {
                if(!storeUserIdCk) setMsg("사용 가능한 아이디입니다")
                else if(storeUserIdCk) {
                    setMsg("이미 존재하는 아이디입니다");
                    isIdCk = false;
                } 
            } else setMsg("아이디를 입력해주세요");

        } else if(!isIdCk && !userId) setMsg("")
    }, [isIdCk])

    const onUserIdDuplicatedCk = () => {
        isIdCk = true;
        setModal(true)
        userIdCk(userId)
    }
    
    
    const onSubmitHandler = (e) => {
        if(!userId || userId.trim().length === 0){
            setMsg('아이디를 입력해주세요');
        }else if(!isIdCk) {
            setMsg('아이디 체크는 필수입니다')
        } else if(!userPwd && userPwd.trim().length === 0) {
            setMsg('패스워드를 입력해주세요')
        } else if(!userPwdCk && userPwdCk.trim().length === 0) {
            setMsg('패스워드 확인을 해주세요');
        } else if(userPwd !== userPwdCk) {
            setMsg('패스워드와 패스워드 확인의 값이 일치하지 않습니다.');
            setUserPwdCk("");
        } else {
            setMsg("가입되었습니다. 로그인해주세요.")
            userJoin(userId, userPwd);
            cartInit(userId);
            orderByInit(userId);
            setTimeout(() => navigate("/login"), [1400])
            
            isIdCk = false;
        }
        e.preventDefault();
    }

    
    return (
        <div style={{ textAlign: 'center', margin: '50px'}}>
            <h1>회원가입</h1>
            <form onSubmit={onSubmitHandler}>
                <div >
                    <TextField type="text" label="ID" variant="standard" value={userId} onChange={onUserIdHandler} style={{width: "210px"}}/>
                    <Button type="button" variant="outlined" onClick={onUserIdDuplicatedCk} disabled={(isIdCk && !storeUserIdCk && userId !== "")} >중복확인</Button>
                </div>
                <TextField type="password" label="Password" variant="standard" value={userPwd} onChange={onUserPwdHandler}  style={{width: "300px"}}/><br />
                <TextField type="password" label="Password Check" variant="standard" value={userPwdCk} onChange={onUwerPwdCkHandler} style={{width: "300px"}}/><br />
                <Button type="submit" variant="outlined" color="success" style={{marginTop: "20px", width: "300px"}} onClick={() => setModal(true)}>가입</Button>
            </form>
            <TransitionsModal modal={modal} onCloseModal={onCloseModal} msg={msg}/>
            {/* <div onChange={onChangeMsg}>{msg}</div> */}
        </div>
    )
}

export default connect(ReduxState, ReduxAction)(Join);