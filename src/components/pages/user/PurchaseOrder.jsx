import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { orderSheet } from "../../../modules/order"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import { cartDelItem } from "../../../modules/cart";


const getCurrentDate = (now) => {
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1 < 10) ? ('0' + (now.getMonth() + 1).toString()) : ((now.getMonth() + 1).toString());
    const day = (now.getDate() < 10) ? ('0' + (now.getDate().toString())) : (now.getDate().toString());
    const hour = (now.getHours() < 10) ? ('0' + (now.getHours().toString())) : (now.getHours().toString());
    const minutes = (now.getMinutes() < 10) ? ('0' + (now.getMinutes().toString())) : (now.getMinutes().toString());
    const seconds = (now.getSeconds() < 10) ? ('0' + (now.getSeconds().toString())) : (now.getSeconds().toString());

    return year + month + day + hour + minutes + seconds
}


function PurchaseOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isChk1 = useRef(false);
    const isChk2 = useRef(false);
    const { storeUserId, orderItemList } = useLocation().state;
    const storeUser = useSelector((state) => ({user: state.user}), shallowEqual).user.userInfo
    const storeUserAddress = (Array.isArray(storeUser)) ? storeUser[0].address : storeUser.address;

    let sum = 0;
    let fee = 3000;
    const orderState = "주문 완료";
    orderItemList.map((item) => sum += (item.price * item.itemAmount * 100) / 100)

    const onSubmitHandler = (e) => {
        if(!storeUserAddress) alert("배송지를 등록해주세요")
        else if(!isChk1.current.checked) alert("사항1에 동의해주세요")
        else if(!isChk2.current.checked) alert("사항2에 동의해주세요")
        else onOrderHandler()
        e.preventDefault();
    }
    const onOrderHandler = () => {
        dispatch(orderSheet(storeUserId, orderItemList, orderState, getCurrentDate(new Date()), storeUserAddress, sum, fee, sum + fee));
        orderItemList.map((item) => dispatch(cartDelItem(storeUserId, item.id)));
        navigate("/user/OrderHistory", {state: getCurrentDate(new Date())});
    }
    
    return (
        <>
            <form onSubmit={onSubmitHandler} style={{marginTop: "30px"}}>
                <div style={{textAlign: "center"}}>
                    <TextField disabled label="Address" defaultValue={storeUserAddress}/>
                    <Button type="button" variant="outlined" onClick={() => navigate("/user/MyPage", { state: {mainType: "userAddress", subType: null} })}>{storeUserAddress ? "배송지 변경" : "배송지 등록"}</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">수량</TableCell>
                                <TableCell align="right">금액</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderItemList.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row"><img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/></TableCell>
                                <TableCell >{item.title}</TableCell>
                                <TableCell align="right">{item.itemAmount}</TableCell>
                                <TableCell align="right">{Math.round(item.itemAmount * item.price * 100) / 100}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">상품 금액: {sum}</TableCell>
                                <TableCell align="right">배송비: {fee}</TableCell>
                                <TableCell align="right">함계: {sum + fee}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>  
                <div style={{margin: "50px 20px"}}>
                    <div>
                        <input type="checkbox" ref={isChk1}/>
                        <span>사항 1</span>
                    </div>
                    <div>
                        <input type="checkbox" ref={isChk2} />
                        <span>사항 2</span>
                    </div>
                </div>
                <Button type="submit" variant="outlined" color="success">주문하기</Button>
            </form>
            
            
{/* 
            <form onSubmit={onSubmitHandler}>
                <div>
                    <div>배송지</div>
                    <div>{storeUserAddress}</div>
                    <div>
                        <button type="button" onClick={() => navigate("/user/MyPage", { state: {mainType: "userAddress", subType: null} })}>{storeUserAddress ? "배송지 변경" : "배송지 등록"}</button>
                    </div>
                </div>
                <div>
                    <div>상품</div>
                    {orderItemList.map((item) => (
                        <div key={item.id} style={{border: "1px solid black"}}>
                            <div>
                                <span>{item.title}</span> 
                            </div>
                            <div>
                                <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                                <div>가격: {sum}</div>
                                <div>수량: {item.itemAmount} </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div>상품금액: {sum}</div>
                    <div>배송비: {fee}</div>
                    <div>합계: {sum + fee}</div>
                </div>
                <div>
                    <input type="checkbox" ref={isChk1} />
                    <span>사항 1</span>
                </div>
                <div>
                    <input type="checkbox" ref={isChk2} />
                    <span>사항 2</span>
                </div>
                <button type="submit">주문하기</button>
            </form>
*/}
        </>
    )
}

export default PurchaseOrder;