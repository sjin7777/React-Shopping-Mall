import { useState, useEffect } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { cartItemCountUp, cartItemCountDown, cartDelItem } from "../../../modules/cart";

const url = `https://fakestoreapi.com/products`;

const ReduxState = (state) => ({
    userId: state.userId,
    itemId: state.itemId,
    itemCount: state.itemCount
})

const ReduxAction = (dispatch) => ({
    cartItemCountUp: (userId, itemId, itemCount) => dispatch(cartItemCountUp(userId, itemId, itemCount)),
    cartItemCountDown: (userId, itemId, itemCount) => dispatch(cartItemCountDown(userId, itemId, itemCount)),
    cartDelItem : (userId, itemId) => dispatch(cartDelItem(userId, itemId))
})


function CartList({cartItemCountUp, cartItemCountDown, cartDelItem}) {
    const storeToken = useSelector((state) => ({ token: state.token }), shallowEqual).token;
    const storeUserId = (storeToken.isLogin) ? storeToken.userId : '';
    const storeUserCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart[storeUserId];
    
    const [ items, setItems ] = useState([]);
    const [ checkedList, setCheckedList ] = useState([]);
    const [ isAllChecked, setIsAllChecked ] = useState(false);
    
    useEffect(() => {
        fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((dataArr) => {                
            dataArr = dataArr.filter((data) => storeUserCart.some((storeCart) => (data.id === storeCart.itemId)) );
            dataArr = dataArr.map((data) => Object.assign(data, storeUserCart.find((storeCart) => storeCart.itemId === data.id)))
            setItems(dataArr)
        })
    }, [storeUserCart])

    useEffect(() => {
        setIsAllChecked((checkedList.length > 0) && (checkedList.length) === (items.map((item) => item.id).length));
    })


    const onCheckBoxHandler = (e, id) => (e.currentTarget.checked) ? setCheckedList([...checkedList, id]) : setCheckedList(checkedList.filter((checked) => checked !== id));
    
    const onAllCheckBoxHandler = (e) => {
        setIsAllChecked(e.currentTarget.checked);
        (!isAllChecked) ? items.map((item) => (!checkedList.includes((item.id)) && setCheckedList(prev => prev.concat(item.id)))) : setCheckedList([]);
    }

    return (
        <>
            <h1> {storeUserId}의 장바구니</h1>
            <div>
                <input type="checkbox" checked={isAllChecked} onChange={(e) => onAllCheckBoxHandler(e)}/>
                <button onClick={() => checkedList.map((itemId) => cartDelItem(storeUserId, itemId))}>삭제하기</button>
            </div>
            
            {items.map((item) => (
                <div key={item.id} style={{border: "1px solid black"}}>
                    <div>
                        <input type="checkbox" checked={checkedList.includes(item.id)} onChange={(e) => onCheckBoxHandler(e, item.id)}/>
                        <span>{item.title}</span> 
                    </div>
                    <div>
                        <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                        <span>가격: {item.price * item.itemCount}</span>
                    </div>
                    <div>
                        <span>수량</span>
                        <button onClick={() => cartItemCountDown(storeUserId, item.id, item.itemCount)} disabled={item.itemCount <= 1}>-</button>
                        <input type="number" value={item.itemCount} onChange={(e) => (e.target.value)} min="1" max="10" style={{width: "50px"}} />
                        <button onClick={() => cartItemCountUp(storeUserId, item.id, item.itemCount)} disabled={item.itemCount >= 10}>+</button>
                    </div>
                </div>
            ))}
        </>
    )
}
export default connect(ReduxState, ReduxAction)(CartList);