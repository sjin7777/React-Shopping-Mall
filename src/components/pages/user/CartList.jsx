import { useState, useEffect } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { cartItemCountUp, cartItemCountDown, cartDelItem } from "../../../modules/cart";
import { orderByItem } from "../../../modules/order";
import { useNavigate } from "react-router";

const url = `https://fakestoreapi.com/products`;


const ReduxState = (state) => ({
    userId: state.userId,
    itemId: state.itemId,
    itemCount: state.itemCount
})

const ReduxAction = (dispatch) => ({
    cartItemCountUp: (userId, itemId, itemCount) => dispatch(cartItemCountUp(userId, itemId, itemCount)),
    cartItemCountDown: (userId, itemId, itemCount) => dispatch(cartItemCountDown(userId, itemId, itemCount)),
    cartDelItem: (userId, itemId) => dispatch(cartDelItem(userId, itemId)),
    orderByItem: (userId, itemList) => dispatch(orderByItem(userId, itemList))
})


function CartList({cartItemCountUp, cartItemCountDown, cartDelItem, orderByItem}) {
    const navigate = useNavigate();
    const storeToken = useSelector((state) => ({ token: state.token }), shallowEqual).token;
    const storeUserId = (storeToken.isLogin) ? storeToken.userId : '';
    const storeUserCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart[storeUserId];
    
    const [ items, setItems ] = useState([]);
    const [ checkedList, setCheckedList ] = useState([]);
    const [ isAllChecked, setIsAllChecked ] = useState(false);
    const [ orderItemList, setOrderItemList ] = useState([]);
    
    useEffect(() => {
        fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((dataArr) => {                
            dataArr = dataArr.filter((data) => storeUserCart.some((storeCart) => (data.id === storeCart.itemId)) );
            dataArr = dataArr.map((data) => Object.assign(data, storeUserCart.find((storeCart) => storeCart.itemId === data.id)))
            setItems(dataArr)
        })
    }, [storeUserCart]);

    useEffect(() => {
        setIsAllChecked((checkedList.length > 0) && ((checkedList.length) === (items.length)));
    }, [checkedList, setIsAllChecked, items.length])

    useEffect(() => {
        setOrderItemList([]);
        (items.forEach((item) => checkedList.filter((ckId) => (item.id === ckId) && setOrderItemList((prev) => prev.concat(item)))));
    }, [setOrderItemList, checkedList, items])



    const onCheckBoxHandler = (e, itemId) => (e.currentTarget.checked) ? setCheckedList((prev) => prev.concat(itemId)) : setCheckedList((prev) => prev.filter((ckId) => ckId !== itemId));

    const onAllCheckBoxHandler = (e) => {
        setIsAllChecked(e.currentTarget.checked);
        setCheckedList([]);
        (!isAllChecked) ? items.map((item) => setCheckedList((prev) => prev.concat(item.id))) : setCheckedList([]);
    }


    const onCartDelHandler = () => {
        checkedList.map((ckId) => cartDelItem(storeUserId, ckId));
        setCheckedList([]);
    }
    
    const onOrderByHandler = () => {
        orderByItem(storeUserId, orderItemList);
        navigate("/user/PurchaseOrder", {state: {storeUserId, orderItemList}});
    }


    return (
        <>
            <h1> {storeUserId}의 장바구니</h1>
            <div>
                <input type="checkbox" checked={isAllChecked} onChange={(e) => onAllCheckBoxHandler(e)}/>
                <button onClick={onCartDelHandler}>삭제하기</button>
                <button onClick={onOrderByHandler}>구매하기</button>
            </div>

            {items.map((item) => (
                <div key={item.id} style={{border: "1px solid black"}}>
                    <div>
                        <input type="checkbox" checked={checkedList.some((ckId) => ckId === item.id)} onChange={(e) => onCheckBoxHandler(e, item.id)}/>
                        <span>{item.title}</span> 
                    </div>
                    <div>
                        <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                        <span>가격: {item.price * item.itemCount}</span>
                    </div>
                    <div>
                        <span>수량</span>
                        <button onClick={() => cartItemCountDown(storeUserId, item.id, item.itemCount)} disabled={item.itemCount <= 1}>-</button>
                        <input type="number" value={item.itemCount} onChange={(e) => (e.current.value)} min="1" max="10" style={{width: "50px"}} />
                        <button onClick={() => cartItemCountUp(storeUserId, item.id, item.itemCount)} disabled={item.itemCount >= 10}>+</button>
                    </div>
                </div>
            ))}
            
        </>
    )
}
export default connect(ReduxState, ReduxAction)(CartList);


















// function CartList({cartItemCountUp, cartItemCountDown, cartDelItem, orderByItem}) {
//     const navigate = useNavigate();
//     const storeToken = useSelector((state) => ({ token: state.token }), shallowEqual).token;
//     const storeUserId = (storeToken.isLogin) ? storeToken.userId : '';
//     const storeUserCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart[storeUserId];
    
//     const [ items, setItems ] = useState([]);
//     const [ checkedList, setCheckedList ] = useState([]);
//     const [ isAllChecked, setIsAllChecked ] = useState(false);
    
//     useEffect(() => {
//         fetch(url, {method: "GET"})
//         .then((response) => response.json())
//         .then((dataArr) => {                
//             dataArr = dataArr.filter((data) => storeUserCart.some((storeCart) => (data.id === storeCart.itemId)) );
//             dataArr = dataArr.map((data) => Object.assign(data, storeUserCart.find((storeCart) => storeCart.itemId === data.id)))
//             setItems(dataArr)
//         })
//     }, [storeUserCart])

//     useEffect(() => {
//         setIsAllChecked((checkedList.length > 0) && ((checkedList.length) === (items.length)));

//         console.log('checkedList >>>>>>>>>>>> ', checkedList)
//     }, [cartDelItem, checkedList, setCheckedList, isAllChecked, setIsAllChecked, items ])


//     const onCheckBoxHandler = (e, item) => (e.currentTarget.checked) ? setCheckedList([...checkedList, item]) : setCheckedList(checkedList.filter((checked) => checked.id !== item.id));

//     const onAllCheckBoxHandler = (e) => {
//         setIsAllChecked(e.currentTarget.value);
//         (!isAllChecked) ? items.map((item) => (!checkedList.some((checked) => checked.id === item.id)) && setCheckedList(items)) : setCheckedList([]);
//     }

//     const onCartDelHandler = () => {
//         checkedList.map((item) => cartDelItem(storeUserId, item.itemId))
//         setCheckedList([]);
//     }

//     const onOrderByHandler = () => {
//         (items.map((item) => checkedList.forEach((checked) => ((checked.id === item.id) ? {...checked, itemCount: item.itemCount} : checked))));
        
//         console.log('11checkedList >>>>>>>>>>>> ', checkedList)
        
//         console.log('order >> ', checkedList.map((checked) => items.map((item) => (checked.id === item.id) ? {...checked, itemCount: item.itemCount} : checked)))
//         orderByItem(storeUserId, checkedList);
//         navigate("/user/PurchaseOrder", {state: {storeUserId, checkedList}});
//     }

//     // const onItemCountUp = (itemId, itemCount) => {
//     //     cartItemCountUp(storeUserId, itemId, itemCount)
//     // }

//     // const onItemCountDown = (itemId, itemCount) => {
//     //     setCheckedList(checkedList.map((checked) => (checked.id === itemId) ? {...checked, itemCount: itemCount} : checked));
//     //     cartItemCountDown(storeUserId, itemId, itemCount)
//     // }

//     const onChangeHandler = (value, itemId, itemCount) => {
//         setCheckedList(checkedList.map((checked) => (checked.id === itemId) ? {...checked, itemCount: itemCount} : checked));
//         console.log('value >>>>>>>> ', value)
//         console.log('itemId >>>>>>>> ', itemId)
//         console.log('itemCount >>>>>>>> ', itemCount)
//     }
//     return (
//         <>
//             <h1> {storeUserId}의 장바구니</h1>
//             <div>
//                 <input type="checkbox" checked={isAllChecked} onChange={(e) => onAllCheckBoxHandler(e)}/>
//                 <button onClick={onCartDelHandler}>삭제하기</button>
//                 <button onClick={onOrderByHandler}>구매하기</button>
//             </div>
//             {items.map((item) => (
            
//                 <div key={item.id} style={{border: "1px solid black"}}>
//                     <div>
//                         <input type="checkbox" checked={checkedList.some((checked) => checked.id === item.id)} onChange={(e) => onCheckBoxHandler(e, item)}/>
//                         <span>{item.title}</span> 
//                     </div>
//                     <div>
//                         <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
//                         <span>가격: {item.price * item.itemCount}</span>
//                     </div>
//                     <div>
//                         <span>수량</span>
//                         <button onClick={() => cartItemCountDown(storeUserId, item.id, item.itemCount)} disabled={item.itemCount <= 1}>-</button>
//                         <input type="number" value={item.itemCount} onChange={(e) => onChangeHandler(e.target.value, item.id, item.itemCount)} min="1" max="10" style={{width: "50px"}} />
//                         <button onClick={() => cartItemCountUp(storeUserId, item.id, item.itemCount)} disabled={item.itemCount >= 10}>+</button>
//                     </div>
//                 </div>
//             ))}
//         </>
//     )
// }
// export default connect(ReduxState, ReduxAction)(CartList);