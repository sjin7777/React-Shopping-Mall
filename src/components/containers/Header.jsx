import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { delToken } from "../../modules/token";
import { userLogout } from "../../modules/user";
import { cartRemove } from "../../modules/cart";

import { Button, ButtonGroup } from "@mui/material";
import IconCart from "../ui/icons/IconCart";
import IconHouse from "../ui/icons/IconHouse";
import styled from "styled-components";

const Nav = styled.nav`
    position: absolute;
`


function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeToken = useSelector((state) => ({ token: state.token}), shallowEqual).token;
    const storeCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart; 
    const storeIsLogin = storeToken.isLogin;
    const storeUserId = (storeIsLogin) ? storeToken.userId : null;
    const storeUserCart = (storeIsLogin) ? storeCart[storeUserId] : [];

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
            <header style={{ position: 'fixed', background: "black", height: '80px', width: '100%', textAlign: 'center'}}>
                <Button variant="text" onClick={() => navigate("/")}><IconHouse /></Button>
                <Nav style={navGuest}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => navigate("/Join")}>Sign up</Button>
                        <Button onClick={() => navigate("/Login")}>Sign in</Button>
                    </ButtonGroup>
                </Nav>
                <Nav style={navUser}>
                    <div>{storeUserId + '님'}</div>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => navigate("/user/MyPage", {state: {mainType: "userInfo", subType: null}})}>MyPage</Button>
                        <Button onClick={() => navigate("/user/CartList")}><IconCart itemCount={storeUserCart.length}/></Button>
                        <Button onClick={onLogoutHandler}>Logout</Button>
                    </ButtonGroup>
                </Nav>
            </header>
        </>
    )
}

export default Header;