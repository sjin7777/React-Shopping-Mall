import { useState, useEffect, useRef } from "react";
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
    }, [storeUserCart, items])


    const onCheckBoxHandler = (e, cartKey) => {
        (e.currentTarget.checked) ? setCheckedList([...checkedList, cartKey]) : setCheckedList(checkedList.filter((checked) => checked !== cartKey));
    };

    const onAllCheckBoxHandler = (e) => {
        setIsAllChecked(e.currentTarget.checked);
        (!isAllChecked) ? items.map((item) => (!checkedList.includes((item.cartKey)) && setCheckedList(prev => prev.concat(item.cartKey)))) : setCheckedList([]);
    }
    
    useEffect(() => {
        setIsAllChecked((checkedList.length) === (items.map((item) => item.cartKey).length) && (checkedList.length > 0))
        // console.log('checkedList >>>>>>>>>>> ', checkedList)
    }, [checkedList, isAllChecked, setIsAllChecked])




    return (
        <>
            <h1> {storeUserId}의 장바구니</h1>
            <div>
                <input type="checkbox" checked={isAllChecked} onChange={(e) => onAllCheckBoxHandler(e)}/>
                <button>삭제하기</button>
            </div>
            
            {items.map((item) => (
                <div key={item.cartKey} style={{border: "1px solid black"}}>
                    <div>
                        <input type="checkbox" checked={checkedList.includes(item.cartKey)} onChange={(e) => onCheckBoxHandler(e, item.cartKey)}/>
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