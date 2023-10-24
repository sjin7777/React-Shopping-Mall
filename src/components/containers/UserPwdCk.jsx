import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userCk, userLogin } from "../../modules/user";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";

function UserPwdCk() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    const storeUserPwd = useSelector((state) => ({ user: state.user }), shallowEqual).user.userInfo.userPwd
    const [ userPwd, setUserPwd ] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!userPwd) {
            alert("비밀번호를 입력해주세요")
        } else if(!storeUserPwd) {
            alert("비밀번호가 일치하지 않습니다");
            setUserPwd("");
        } else{
            dispatch(userLogin(storeUserId, userPwd))
            navigate("/user/MyPage",  {state: {mainType: "userInfo", subType: "userInfoModify"}})
        }
    }
    return(
        <>
            <h4>비밀번호를 입력해주세요.</h4>
            <form onSubmit={onSubmitHandler}>
                <TextField type="text" label="ID" variant="standard" value={storeUserId} disabled={true}/>
                <TextField type="password" label="Password" variant="standard" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} style={{display: "block"}} />
                <Button type="submit" variant="outlined" color="success" onClick={() => dispatch(userCk(storeUserId, userPwd))} style={{marginTop: "20px", width: "200px"}}>확인</Button>
            </form>
        </>
    )
}

export default UserPwdCk;