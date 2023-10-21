import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { orderSheet } from "../../../modules/order"
import { useDispatch } from "react-redux";


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
    const [ address, setAddress ] = useState("");
    const {storeUserId, checkedList} = useLocation().state;
    console.log('storeUserId >>>>>>>>>>>> ', storeUserId)
    console.log('checkedList >>>>>>>>>>>> ', checkedList)

    let total = 0;
    checkedList.map((item) => total += item.price * item.itemCount)

    const onOrderHandler = () => {
        dispatch(orderSheet(storeUserId, checkedList, getCurrentDate(new Date()), address, total));
        navigate("/user/OrderHistory");
    }

    return (
        <>
            <div>
                <div>배송지</div>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
                <div>상품</div>
                {checkedList.map((item) => (
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

            <div>
                <div>최종금액: {total}</div>
            </div>

            <div>
                <input type="checkbox"/>
                <input type="checkbox"/>
            </div>
            <button  onClick={onOrderHandler}>주문하기</button>
        </>
    )
}

export default PurchaseOrder;