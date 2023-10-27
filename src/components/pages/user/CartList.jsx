import { useState, useEffect } from "react";
import { connect, shallowEqual, useSelector } from "react-redux";
import { cartItemAmountUp, cartItemAmountDown, cartDelItem } from "../../../modules/cart";
import { orderByItem } from "../../../modules/order";
import { useNavigate } from "react-router";
import IconLoading from "../../ui/icons/IconLoading";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';
import { CheckBox } from "@mui/icons-material";

const url = `https://fakestoreapi.com/products`;


const ReduxState = (state) => ({
    userId: state.userId,
    itemId: state.itemId,
    itemAmount: state.itemAmount
})

const ReduxAction = (dispatch) => ({
    cartItemAmountUp: (userId, itemId, itemAmount) => dispatch(cartItemAmountUp(userId, itemId, itemAmount)),
    cartItemAmountDown: (userId, itemId, itemAmount) => dispatch(cartItemAmountDown(userId, itemId, itemAmount)),
    cartDelItem: (userId, itemId) => dispatch(cartDelItem(userId, itemId)),
    orderByItem: (userId, itemList) => dispatch(orderByItem(userId, itemList))
})


function CartList({cartItemAmountUp, cartItemAmountDown, cartDelItem, orderByItem}) {
    const navigate = useNavigate();
    const storeToken = useSelector((state) => ({ token: state.token }), shallowEqual).token;
    const storeUserId = (storeToken.isLogin) ? storeToken.userId : '';
    const storeUserCart = useSelector((state) => ({ cart: state.cart }), shallowEqual).cart[storeUserId];
    
    const [ items, setItems ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ checkedList, setCheckedList ] = useState([]);
    const [ isAllChecked, setIsAllChecked ] = useState(false);
    const [ orderItemList, setOrderItemList ] = useState([]);
    
    useEffect(() => {
        fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((dataArr) => {                
            dataArr = dataArr.filter((data) => storeUserCart.some((storeCart) => (data.id === storeCart.itemId)) );
            dataArr = dataArr.map((data) => Object.assign(data, storeUserCart.find((storeCart) => storeCart.itemId === data.id)))
            setItems(dataArr);
            setIsLoading(false)
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
        if(orderItemList.length !== 0) {
            orderByItem(storeUserId, orderItemList);
            navigate("/user/PurchaseOrder", {state: {storeUserId, orderItemList}});
        }
    }



    // const itemList = items.map((item) => (
    //     <div key={item.id} style={{border: "1px solid black"}}>
    //         <div>
    //             <input type="checkbox" checked={checkedList.some((ckId) => ckId === item.id)} onChange={(e) => onCheckBoxHandler(e, item.id)}/>
    //             <span>{item.title}</span> 
    //         </div>
    //         <div>
    //             <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
    //             <span>가격: {item.price * item.itemAmount}</span>
    //         </div>
    //         <div>
    //             <span>수량</span>
    //             <button onClick={() => cartItemAmountDown(storeUserId, item.id, item.itemAmount)} disabled={item.itemAmount <= 1}>-</button>
    //             <input type="number" value={item.itemAmount} onChange={(e) => (e.current.value)} min="1" max="10" style={{width: "50px"}} />
    //             <button onClick={() => cartItemAmountUp(storeUserId, item.id, item.itemAmount)} disabled={item.itemAmount >= 10}>+</button>
    //         </div>
    //     </div>
    // ));


    return (
        <>
            <h1> {storeUserId}의 장바구니</h1>
            
            { isLoading 
                ? <IconLoading /> 
                : <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell><input type="checkbox" checked={isAllChecked} onChange={onAllCheckBoxHandler}/></TableCell>
                                <TableCell><Button onClick={onOrderByHandler}><Typography>구매하기</Typography></Button></TableCell>
                                <TableCell><Button onClick={onCartDelHandler}><Typography>삭제하기</Typography></Button></TableCell>
                                <TableCell />
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell><input type="checkbox" checked={checkedList.some((ckId) => ckId === item.id)} onChange={(e) => onCheckBoxHandler(e, item.id)}/></TableCell>
                                <TableCell component="th" scope="row"><img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/></TableCell>
                                <TableCell >{item.title}</TableCell>
                                <TableCell align="right">
                                    <div style={{display: "flex"}}>
                                        <Button onClick={() => cartItemAmountDown(storeUserId, item.id, item.itemAmount)} disabled={item.itemAmount <= 1}>-</Button>
                                        <span type="text" value={item.itemAmount} onChange={(e) => (e.current.value)} min="1" max="10" style={{marginTop: "7px"}} >{item.itemAmount}</span>
                                        <Button onClick={() => cartItemAmountUp(storeUserId, item.id, item.itemAmount)} disabled={item.itemAmount >= 10}>+</Button>
                                    </div>
                                </TableCell>
                                <TableCell align="right">{Math.round(item.itemAmount * item.price * 100) / 100}</TableCell>
                                <TableCell><Button onClick={() => cartDelItem(storeUserId, item.id)}>X</Button></TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>  
            }
        </>
    )
}
export default connect(ReduxState, ReduxAction)(CartList);
