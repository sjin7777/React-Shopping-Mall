import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { delToken } from "../../modules/token";
import { userLogout } from "../../modules/user";
import { cartRemove } from "../../modules/cart";

import { Button, ButtonGroup, responsiveFontSizes } from "@mui/material";
import IconCart from "../ui/icons/IconCart";
import IconHouse from "../ui/icons/IconHouse";
import styled from "styled-components";
import "../../css/util.css";

const Nav = styled.nav`
    position: relative;
    top: 20%;
    left: 73%;
    text-align: right;
`;


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
            <header style={{ position: 'sticky', width: '100%', height: '80px', top: '0px', backgroundColor: 'black'}}>
                <div style={{color: 'yellow'}}>
                    <IconHouse onClick={() => navigate("/")} />
                </div>
                <Nav style={navGuest}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => navigate("/Join")}>Sign up</Button>
                        <Button onClick={() => navigate("/Login")}>Sign in</Button>
                    </ButtonGroup>
                </Nav>
                <Nav style={navUser}>
                    <span style={{ color: "white"}}>{storeUserId + '님'}</span>
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