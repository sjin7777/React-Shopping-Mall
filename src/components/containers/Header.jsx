import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { delToken } from "../../modules/token";
import { userLogout } from "../../modules/user";
import { cartRemove } from "../../modules/cart";

import { Button, ButtonGroup } from "@mui/material";
import IconCart from "../ui/icon/IconCart";
import IconHouse from "../ui/icon/IconHouse";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeToken = useSelector((state) => ({ token: state.token}), shallowEqual).token;
    const storeIsLogin = storeToken.isLogin;
    const storeUserId = (storeIsLogin) ? storeToken.userId : null;
    
    const storeCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart[storeUserId];
    
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
                <Button variant="text" onClick={() => navigate("/")}><IconHouse /></Button>
                
            </header>
            <nav style={navGuest}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => navigate("/Join")}>Sign up</Button>
                    <Button onClick={() => navigate("/Login")}>Sign in</Button>
                </ButtonGroup>
            </nav>
            <nav style={navUser}>
                <span>회원 {storeUserId}님</span>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => navigate("/user/MyPage", {state: {mainType: "userInfo", subType: null}})}>MyPage</Button>
                    <Button onClick={() => navigate("/user/CartList")}>{IconCart(storeCart.length)}</Button>
                    <Button onClick={onLogoutHandler}>Logout</Button>
                </ButtonGroup>
            </nav>
        
        </>
    )
}

export default Header;