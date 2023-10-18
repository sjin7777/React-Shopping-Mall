import { useState, useEffect } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { cartItemCountUp, cartItemCountDown } from "../../../modules/cart";

const url = `https://fakestoreapi.com/products`;

const ReduxState = (state) => ({
    userId: state.userId,
    itemId: state.itemId,
    itemCount: state.itemCount
})

const ReduxAction = (dispatch) => ({
    cartItemCountUp: (userId, itemId, itemCount) => dispatch(cartItemCountUp(userId, itemId, itemCount)),
    cartItemCountDown: (userId, itemId, itemCount) => dispatch(cartItemCountDown(userId, itemId, itemCount))
})


function CartList({cartItemCountUp, cartItemCountDown}) {
    const storeToken = useSelector((state) => ({ token: state.token }), shallowEqual).token;
    const storeCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart.userCart;
    const arrayCart = Array.isArray(storeCart[0]) ? storeCart[0] : storeCart;
    
    const ck = (storeCart) && (storeToken.isLogin);
    const storeUserId = (ck) ? storeToken.userId : '';
    const storeUserCart = (ck) ? arrayCart.slice(1, arrayCart.length) : null;
    const [ items, setItems ] = useState([]);
    
    useEffect(() => {
        fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((dataArr) => {                
            dataArr = dataArr.filter((data) => storeUserCart.some((storeCart) => (data.id === storeCart.itemId)) );
            dataArr = dataArr.map((data) => Object.assign(data, storeUserCart.find((storeCart) => storeCart.itemId === data.id)))
            setItems(dataArr)
        })
    }, [storeUserCart])

    return (
        <>
            <h1> {storeUserId}의 장바구니</h1>
            <button >삭제하기</button>
            
            {items.map((item) => (
                <div key={item.cartKey} style={{border: "1px solid black"}}>
                    <div>
                        <input key={item.cartKey} type="checkbox"/>
                        <span>{item.title}</span> 
                    </div>
                    <div>
                        <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                        <span>가격: {item.price}</span>
                    </div>
                    <div>
                        <span>수량</span>
                        <button onClick={() => cartItemCountDown(storeUserId, item.id, item.itemCount)}>-</button>
                        <input type="number" value={item.itemCount} onChange={(e) => e.target.value} style={{width: "50px"}}/>
                        <button onClick={() => cartItemCountUp(storeUserId, item.id, item.itemCount)}>+</button>
                    </div>
                </div>
            ))}
        </>
    )
}
export default connect(ReduxState, ReduxAction)(CartList);