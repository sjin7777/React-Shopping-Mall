import UserAddress from "../../containers/UserAddress";
import UserOrderList from "../../containers/UserOrderList";
import UserInfo from "../../containers/UserInfo";
import { useLocation, useNavigate } from "react-router";

function MyPage() {    
    const navigate = useNavigate();
    const location = useLocation().state;
    const mainType = location.mainType;
    const subType = location.subType;

    const mypageTab = (type) => {
        switch(type) {
            case "userInfo":
                return <UserInfo subType={subType}/>
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
            <button onClick={() => navigate("/user/MyPage", {state: {mainType: "userInfo"}})}>회원 정보</button>
            <button onClick={() => navigate("/user/MyPage", {state: {mainType: "userAddress"}})}>배송지</button>
            <button onClick={() => navigate("/user/MyPage", {state: {mainType: "userOrderList"}})}>주문 내역</button>
            {mypageTab(mainType)}
        </>
    )
}

export default MyPage;