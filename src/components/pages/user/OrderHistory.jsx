import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router";

function OrderHistory() {
    const storeOrderDate = useLocation().state;
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    const storeOrderSheet = useSelector((state) => ({ order: state.order }), shallowEqual).order.orderSheetList[storeUserId].filter((order) => order[storeOrderDate + '_' + storeUserId])[0][storeOrderDate + '_' + storeUserId];

    return (
        <>
            <h1>주문내역</h1>
            
            <div>주문일자: {storeOrderDate.slice(0,4)+'-'+storeOrderDate.slice(4,6)+'-'+storeOrderDate.slice(6,8)+' '+storeOrderDate.slice(8,10) + ':' + storeOrderDate.slice(10,12)}</div>
            <div>배송지: {storeOrderSheet.address}</div>
            
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
                        {storeOrderSheet.itemList[0].map((item, index) => (
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
                            <TableCell align="right">상품 금액: {storeOrderSheet.sum}</TableCell>
                            <TableCell align="right">배송비: {storeOrderSheet.fee}</TableCell>
                            <TableCell align="right">함계: {storeOrderSheet.total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>  

{/* 
            <div key={storeOrderDate + '_' + storeUserId}>
                <div>주문일자: {storeOrderDate.slice(0,4)+'-'+storeOrderDate.slice(4,6)+'-'+storeOrderDate.slice(6,8)+' '+storeOrderDate.slice(8,10) + ':' + storeOrderDate.slice(10,12)}</div>
                <div>배송지: {storeOrderSheet.address}</div>
                <div>총 합계: {storeOrderSheet.total}</div>
                <div>
                    {storeOrderSheet.itemList[0].map((item) => (
                        <div key={item.id} style={{border: "1px solid black"}}>
                            <div>
                                <span>{item.title}</span> 
                            </div>
                            <div>
                                <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                                <div>가격: {item.price * item.itemAmount}</div>
                                <div>수량: {item.itemAmount} </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
*/}
        </>
    )
}

export default OrderHistory;