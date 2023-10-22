import { shallowEqual, useSelector } from "react-redux";


function UserOrderList() {
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    const storeOrderSheetList = useSelector((state) => ({order: state.order}), shallowEqual).order.orderSheetList[storeUserId];
    const storeOrderSheetListReverse = [...storeOrderSheetList].reverse()
    
    return (
        <>
            {storeOrderSheetListReverse.map((order, index) => {
                const orderListKey = Object.keys(order)[0];
                const orderList = order[orderListKey];
                const orderItemList = orderList.itemList[0];
                const orderDate = orderList.orderDate;
                
                return (
                    <div key={orderListKey} style={{border: "solid 1px black", padding: "30px 10px"}}>
                        <div>No.{storeOrderSheetListReverse.length - index}</div>
                        <div>주문일자: {orderDate.slice(0,4)+'-'+orderDate.slice(4,6)+'-'+orderDate.slice(6,8)+' '+orderDate.slice(8,10) + ':' + orderDate.slice(10,12)}</div>
                        <div>배송지: {orderList.address}</div>
                        <div>금액: {orderList.total}</div>

                        {orderItemList.map((item) => (
                            <div key={orderListKey + '_' + item.id} style={{border: "1px solid black"}}>
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
                )
            })}
        </>
    )
}

export default UserOrderList;