import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { orderSheet } from "../../../modules/order"
import { shallowEqual, useDispatch, useSelector } from "react-redux";


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
    const storeUserAddress = useSelector((state) => ({user: state.user}), shallowEqual).user.userInfo.address

    let total = 0;
    orderItemList.map((item) => total += item.price * item.itemCount)

    const onSubmitHandler = (e) => {
        if(!storeUserAddress) alert("배송지를 등록해주세요")
        else if(!isChk1.current.checked) alert("사항1에 동의해주세요")
        else if(!isChk2.current.checked) alert("사항2에 동의해주세요")
        else onOrderHandler()
        e.preventDefault();
    }
    const onOrderHandler = () => {
        dispatch(orderSheet(storeUserId, orderItemList, getCurrentDate(new Date()), storeUserAddress, total+3000));
        navigate("/user/OrderHistory", {state: getCurrentDate(new Date())});
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <div>배송지</div>
                <div>{storeUserAddress}</div>
                <div>
                    <button type="button" onClick={() => navigate("/user/MyPage", { state: {type: "userAddress", subType: null} })}>{storeUserAddress ? "배송지 변경" : "배송지 등록"}</button>
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
                            <div>가격: {item.price * item.itemCount}</div>
                            <div>수량: {item.itemCount} </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div>상품금액: {total}</div>
                <div>배송비: 3000</div>
                <div>합계: {total + 3000}</div>
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
    )
}

export default PurchaseOrder;