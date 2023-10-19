import { useEffect, useState } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { cartAddItem, cartDelItem } from "../../modules/cart";

const ReduxState = (state) => ({
    userId: state.userId,
    itemId: state.itemId
})

const ReduxAction = (dispatch) => ({
    cartAddItem: (userId, itemId) => dispatch(cartAddItem(userId, itemId)),
    cartDelItem: (userId, itemId) => dispatch(cartDelItem(userId, itemId))
})


function ProductDetail({cartAddItem, cartDelItem}) {
    const navigate = useNavigate();
    const storeToken = useSelector((state) => ({ token: state.token }), shallowEqual).token;
    const storeUserId = (storeToken.isLogin) ? storeToken.userId : '';
    const storeUserCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart[storeUserId];

    const {id, title, price, description, category, image, rating} = useLocation().state.item;
    const [ btnText, setBtnText ] = useState("");

    let inCart = (storeUserId) && storeUserCart.some((item) => item.itemId === id)
    
    useEffect(() => {
        (inCart) ? setBtnText("장바구니 삭제") : setBtnText("장바구니 추가");
    })
    

    const onCartHandler = () => {
        if(inCart) {
            cartDelItem(storeUserId, id)
            alert('장바구니에서 삭제되었습니다.')
            setBtnText("장바구니 추가");
        } else {
            cartAddItem(storeUserId,id)
            setBtnText("장바구니 삭제")
            if(window.confirm('장바구니에 추가되었습니다. \n장바구니로 가시겠습니까?')) {
                navigate("/user/cartlist")
            }
        }
    }
    return (
        <>
            <h1>상품 {id}번 상세페이지</h1>
            <div>
                <h3>{title}</h3>
                <img src={image} alt={title} style={{width: "200px", height: "200px"}}/>
                <button onClick={onCartHandler} style={storeUserId ? {display: "inline"} : {display: "none"}}>{btnText}</button>
                <h5>{price}</h5>
                <p>{rating.rate}</p>
                <p>{rating.count}</p>
                <div>{category}</div>
                <p>{description}</p>
            </div>
        </>
    )
}

export default connect(ReduxState, ReduxAction)(ProductDetail);