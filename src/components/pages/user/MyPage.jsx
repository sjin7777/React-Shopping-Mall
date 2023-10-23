import UserAddress from "../../containers/UserAddress";
import UserOrderList from "../../containers/UserOrderList";
import UserInfo from "../../containers/UserInfo";
import { useLocation, useNavigate } from "react-router";

function MyPage() {    
    const navigate = useNavigate();
    const location = useLocation().state;
    const mainType = location.type;
    const subType = location.subType

    const mypageTab = (type) => {
        switch(type) {
            case "userInfo":
                return <UserInfo />
            case "userAddress":
                return <UserAddress />
            case "userOrderList": 
                return <UserOrderList />
            default:
                return <UserInfo />
        }
    }

    return(
        <>
            <h1>마이페이지</h1>
            <button onClick={() => navigate("/user/MyPage", {state: {mainType: "userInfo", subType: null}})}>회원 정보</button>
            <button onClick={() => navigate("/user/MyPage", {state: {mainType: "userAddress", subType: null}})}>배송지</button>
            <button onClick={() => navigate("/user/MyPage", {state: {mainType: "userOrderList", subType: null}})}>주문 내역</button>
            {mypageTab(mainType)}
        </>
    )
}

export default MyPage;