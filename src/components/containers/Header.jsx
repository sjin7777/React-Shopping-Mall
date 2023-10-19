import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { delToken } from "../../modules/token";
import { userLogout } from "../../modules/user";
import { cartRemove } from "../../modules/cart";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeToken = useSelector((state) => ({ token: state.token}), shallowEqual).token;
    const storeIsLogin = storeToken.isLogin;
    const storeUserId = (storeIsLogin) ? storeToken.userId : null;

    const navGuest = (storeIsLogin) ? {display: "none"} : {display: "inline"};
    const navUser = (storeIsLogin) ? {display: "inline"} : {display: "none"};
    
    const onLogoutHandler = () => {
        if(window.confirm('로그아웃 하시겠습니까')) {
            dispatch(userLogout(storeUserId))
            dispatch(delToken(storeUserId))
            dispatch(cartRemove(storeUserId))
            navigate("/");
        }
    }

    return(
        <>
            <header>
                <button onClick={() => navigate("/")}>Home</button>
            </header>
            <nav style={navGuest}>
                <button onClick={() => navigate("/join")}>회원가입</button>
                <button onClick={() => navigate("/login")}>로그인</button>
            </nav>
            <nav style={navUser}>
                <span>회원 {storeUserId}님</span>
                <button onClick={() => navigate("/user/mypage")}>마이페이지</button>
                <button onClick={() => navigate("/user/cartlist")}>장바구니</button>
                <button onClick={onLogoutHandler}>로그아웃</button>
            </nav>
        
        </>
    )
}

export default Header;