import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router";

function OrderHistory() {
    const now = useLocation().state;
    console.log('now >>>>>>> ', now)
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    console.log('storeUserId >>>>>>>>> ', storeUserId)
    const storeOrderSheet = useSelector((state) => ({ order: state.order }), shallowEqual).order.orderSheetList[storeUserId].filter((order) => order[storeUserId + '_' + now])[0][storeUserId + '_' + now];
    // let obj = (storeOrderSheet.map((a) => Object.keys(a)));

    console.log('storeOrderSheet >>>>>>>> ', storeOrderSheet)



    // storeOrderSheet.map((order) => {for(obj in order) console.log('@@@@@@@@@@@@@@ >> ', order[obj])})


    return (
        <>
            <h1>주문내역</h1>
    {/* //         {storeOrderSheet.map((order) => {
    //             for(obj in order){
    //                 return ( */}
                        <div key={storeUserId + '_' + now}>
                            <div>주문일자: {storeOrderSheet.orderDate}</div>
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
    {/* //                 )
    //             }
    //         })} */}
        </>
    )
}

export default OrderHistory;