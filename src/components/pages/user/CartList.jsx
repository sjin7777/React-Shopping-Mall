import { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

const url = `https://fakestoreapi.com/products`;

function CartList() {
    const storeToken = useSelector((state) => ({ token: state.token }), shallowEqual).token;
    const storeCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart.userCart;
    const arrayCart = Array.isArray(storeCart[0]) ? storeCart[0] : storeCart;
    console.log('cartList storeCart >>>> ', arrayCart);
    
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
    }, [])


    const onChangeHandler = () => {
        
    }

    console.log(items)
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
                        {/* <button onClick={() => onDecrement(item.id, item.productCount, counter)}>-</button> */}
                        <input type="number" value={item.itemCount} onChange={onChangeHandler} style={{width: "50px"}}/>
                        {/* <button onClick={() => onIncrement(item.id, item.productCount, counter)}>+</button> */}
                    </div>
                </div>
            ))}
        </>
    )
}
export default CartList;