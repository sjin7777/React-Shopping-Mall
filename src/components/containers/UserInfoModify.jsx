import { useNavigate } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userDelete, userModify } from "../../modules/user";
import { delToken } from "../../modules/token";
import { Button, TextField } from "@mui/material";

function UserInfoModify() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    const storeUserPwd = useSelector((state) => ({ user: state.user }), shallowEqual).user.userInfo.userPwd
    const [ userPwd, setUserPwd ] = useState("");
    const [ userPwdCk, setUserPwdCk ] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!userPwd) alert("새로운 비밀번호를 입력해주세요")
        else if(!userPwdCk) alert("새로운 비밀번호을 확인해주세요")
        else if(userPwd !== userPwdCk) alert("새로운 비밀번호 확인이 일치하지 않습니다")
        else if(userPwd === storeUserPwd) {
            alert("기존 비밀번호와 일치합니다.")
            setUserPwd("")
        }
        else {
            dispatch(userModify(storeUserId, userPwd));
            alert("비밀번호가 변경되었습니다.");
            navigate("/")
        }
    }

    const onUserDelHandler = () => {
        if(window.confirm("정말 탈퇴하시겠습니까?")) {
            dispatch(delToken(storeUserId));
            dispatch(userDelete(storeUserId));
            navigate("/");
            alert("탈퇴 완료");
        }
    }

    return(
        <div style={{margin: "50px"}}>
            <form onSubmit={onSubmitHandler} >
                <TextField type="text" label="ID" variant="standard" value={storeUserId} disabled={true} style={{width: "300px"}} /><br/>
                <TextField type="password" label="New Password" variant="standard" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} style={{width: "300px"}} /><br />
                <TextField type="password" label="New Password Check" variant="standard" value={userPwdCk} onChange={(e) => setUserPwdCk(e.target.value)} style={{width: "300px"}} /><br />
                <Button type="submit" variant="outlined" color="success" style={{marginTop: "20px", width: "300px"}}> 변경</Button>
            </form>
            <Button variant="outlined" color="error" onClick={onUserDelHandler} style={{marginTop: "10px", width: "300px"}}> 탈퇴하기</Button>
        </div>
    )
}
export default UserInfoModify;