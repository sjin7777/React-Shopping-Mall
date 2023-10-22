import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userCk } from "../../modules/user";
import { useNavigate } from "react-router";

function UserPwdCk() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    const storeUserPwd = useSelector((state) => ({ user: state.user }), shallowEqual).user.userInfo.userPwd
    const [ userPwd, setUserPwd ] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!storeUserPwd) {
            alert("비밀번호가 일치하지 않습니다");
            setUserPwd("");
        } else{
            console.log("일치");
            navigate("/user/MyPage")
        }
    }
    return(
        <>
            <h4>비밀번호를 입력해주세요.</h4>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>아이디</label>
                    <input type="text" value={storeUserId} disabled={true}/>
                </div>
                <div>
                    <label>패스워드</label>
                    <input type="password" value={userPwd} onChange={(e) => setUserPwd(e.target.value)}/>
                </div>
                <button type="submit" onClick={() => dispatch(userCk(storeUserId, userPwd))}>확인</button>
            </form>
        </>
    )
}

export default UserPwdCk;