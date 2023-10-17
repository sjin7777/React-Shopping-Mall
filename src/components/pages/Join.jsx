import { useEffect, useState } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { userIdCk, userJoin } from "../../modules/user";
import { cartInit } from "../../modules/cart";
import { useNavigate } from "react-router";


const ReduxState = (state) => ({
    userId: state.userId,
    userPwd: state.userPwd
})

const ReduxAction = (dispatch) => ({
    userIdCk: (userId) => dispatch(userIdCk(userId)),
    userJoin: (userId, userPwd) => dispatch(userJoin(userId, userPwd)),
    cartInit: (userId) => dispatch(cartInit(userId))
})


let isIdCk = false;
function Join({userIdCk, userJoin, cartInit}) {
    const navigate = useNavigate();
    const storeUserIdCk = useSelector((state) => ({user: state.user.userInfo}), shallowEqual).user.userId;
    
    const [ userId, setUserId ] = useState("");
    const [ userPwd, setUserPwd ] = useState("");
    const [ userPwdCk, setUserPwdCk ] = useState("");
    const [ msg, setMsg ] = useState("");
    
    const onUserPwdHandler = (e) => setUserPwd(e.target.value);
    const onUwerPwdCkHandler = (e) => setUserPwdCk(e.target.value);
    const onChangeMsg = (e) => setMsg(e.target.value);
    const onUserIdHandler = (e) => {
        setUserId(e.target.value);
        isIdCk = false;
    }

    useEffect(() => {
        if(isIdCk) {
            (storeUserIdCk) ? setMsg('이미 존재하는 아이디입니다.') : setMsg('사용 가능한 아이디입니다.');
        } 
    }, [storeUserIdCk, msg, setMsg])

    const onUserIdDuplicatedCk = () => {
        if(userId) {
            isIdCk = true;
            userIdCk(userId)
        } else {
            isIdCk = false
            setMsg('아이디를 입력해주세요')
        }
    }
    
    

    const onSubmitHandler = (e) => {
        if(!isIdCk) {
            setMsg('아이디 체크는 필수입니다')
        } else if(!userPwd) {
            setMsg('패스워드를 입력해주세요')
        } else if(!userPwdCk) {
            setMsg('패스워드 확인을 해주세요');
        } else if(userPwd !== userPwdCk) {
            setMsg('패스워드와 패스워드 확인의 값이 일치하지 않습니다.');
            setUserPwdCk("");
        } else {
            setMsg('가입 완료')
            userJoin(userId, userPwd);
            cartInit(userId)
            navigate("/login")
        }
        e.preventDefault();
    }
    
    return (
        <>
            <h1>회원가입</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>아이디</label>
                    <input type="text" value={userId} onChange={onUserIdHandler}/>
                    <button type="button" onClick={onUserIdDuplicatedCk} disabled={(isIdCk && !storeUserIdCk)} >중복확인</button>
                </div>
                <div>
                    <label>패스워드</label>
                    <input type="password" value={userPwd} onChange={onUserPwdHandler}/>
                </div>
                <div>
                    <label>패스워드 확인</label>
                    <input type="password" value={userPwdCk} onChange={onUwerPwdCkHandler}/>
                </div>                
                <button type="submit">가입</button>
            </form>
            <div onChange={onChangeMsg}>{msg}</div>
        </>
    )
}

export default connect(ReduxState, ReduxAction)(Join);