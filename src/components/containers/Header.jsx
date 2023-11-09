import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { delToken } from "../../modules/token";
import { userLogout } from "../../modules/user";
import { cartRemove } from "../../modules/cart";

import "../../css/util.css";
import HeaderContainer, { HeaderLogo, HeaderNav, HeaderNavMenu, HeaderNavMenuItem } from "../ui/tags/HeaderContainer";
import IconCart from "../ui/icons/IconCart";
import IconHouse from "../ui/icons/IconHouse";


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

    return (
        <HeaderContainer>
            <HeaderLogo onClick={() => navigate("/")}><IconHouse/></HeaderLogo>
            <HeaderNav style={navGuest}>
                <HeaderNavMenu>
                    <HeaderNavMenuItem onClick={() => navigate("/Join")}>Sign up</HeaderNavMenuItem>
                    <HeaderNavMenuItem onClick={() => navigate("/Login")}>Sign in</HeaderNavMenuItem>
                </HeaderNavMenu>
            </HeaderNav>
            <HeaderNav style={navUser}>
                <HeaderNavMenu>
                    <HeaderNavMenuItem onClick={() => navigate("/user/MyPage", {state: {mainType: "userInfo", subType: null}})}>MyPage</HeaderNavMenuItem>
                    <HeaderNavMenuItem onClick={() => navigate("/user/CartList")}><IconCart itemCount={storeUserCart.length}/></HeaderNavMenuItem>
                    <HeaderNavMenuItem onClick={onLogoutHandler}>Logout</HeaderNavMenuItem>
                </HeaderNavMenu>
            </HeaderNav>
        </HeaderContainer>
    )
}

export default Header;