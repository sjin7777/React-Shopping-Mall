import { shallowEqual, useSelector } from "react-redux";
// import { useLocation } from "react-router";

function OrderHistory() {
    // const now = useLocation().state;
    // console.log('now >>>>>>> ', now)
    const storeUserId = useSelector((state) => ({ token: state.token }), shallowEqual).token.userId;
    console.log('storeUserId >>>>>>>>> ', storeUserId)
    const storeOrderSheet = useSelector((state) => ({ order: state.order }), shallowEqual).order.orderSheetList[storeUserId];
    let obj = (storeOrderSheet.map((a) => Object.keys(a)));



    storeOrderSheet.map((order) => {for(obj in order) console.log('@@@@@@@@@@@@@@ >> ', order[obj])})


    // return (
    //     <>
    //         <h1>주문내역</h1>
    //         {storeOrderSheet.map((order) => {
    //             for(obj in order){
    //                 return (
    //                     <div key={obj}>
    //                         <div>주문일자: {order[obj][0].orderDate}</div>
    //                         <div>배송지: {order[obj][0].address}</div>
    //                         <div>금액: {order[obj][0].total}</div>
    //                         <div>
    //                             {order[obj][0].checkedList}
    //                         </div>
    //                     </div>
    //                 )
    //             }
    //         })}
    //     </>
    // )
}

export default OrderHistory;