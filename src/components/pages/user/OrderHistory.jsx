import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router";

function OrderHistory() {
    const storeOrderDate = useLocation().state;
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    const storeOrderSheet = useSelector((state) => ({ order: state.order }), shallowEqual).order.orderSheetList[storeUserId].filter((order) => order[storeUserId + '_' + storeOrderDate])[0][storeUserId + '_' + storeOrderDate];

    return (
        <>
            <h1>주문내역</h1>
            <div key={storeUserId + '_' + storeOrderDate}>
                <div>주문일자: {storeOrderDate.slice(0,4)+'-'+storeOrderDate.slice(4,6)+'-'+storeOrderDate.slice(6,8)+' '+storeOrderDate.slice(8,10) + ':' + storeOrderDate.slice(10,12)}</div>
                <div>배송지: {storeOrderSheet.address}</div>
                <div>금액: {storeOrderSheet.total}</div>
                <div>
                    {storeOrderSheet.itemList[0].map((item) => (
                        <div key={item.id} style={{border: "1px solid black"}}>
                            <div>
                                <span>{item.title}</span> 
                            </div>
                            <div>
                                <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                                <div>가격: {item.price * item.itemCount}</div>
                                <div>수량: {item.itemCount} </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default OrderHistory;