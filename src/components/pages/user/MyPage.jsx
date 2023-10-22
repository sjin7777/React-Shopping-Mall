import { useState } from "react";
import UserAddress from "../../containers/UserAddress";
import UserOrderList from "../../containers/UserOrderList";
import UserInfo from "../../containers/UserInfo";
// import { useLocation } from "react-router";

function MyPage() {    
    const [ isUserInfoClick, setIsUserInfoClick ] = useState(true);
    const [ isUserAddressClick, setIsUserAddressClick ] = useState(false);
    const [ isUserOrderListClick, setIsUserOrderListClick ] = useState(false);
    // const [ lev1, setLev1 ] = useState((useLocation().state.lev1))
    // const lev2 = useLocation().state.lev2;
    // console.log('lev1 >>>>>> ', lev1)
    // console.log('lev2 >>>>>> ', lev2)
    
    // useEffect(() => {
    //     setLevel_1(stateLevel);
    //     console.log('level >>> ', level);
    // }, [setLevel, level_1, level_2])

    const onUserInfoView = () => {
        setIsUserInfoClick((prev) => !prev);
        // if(isUserInfoClick) setLev1(false)
        setIsUserAddressClick(false);
        setIsUserOrderListClick(false);
    }
    const onUserAddressView = () => {
        setIsUserInfoClick(false);
        setIsUserAddressClick((prev) => !prev);
        setIsUserOrderListClick(false);
        // setLev1(false)
    }
    const onOUserOrderListView = () => {
        setIsUserInfoClick(false);
        setIsUserAddressClick(false);
        setIsUserOrderListClick((prev) => !prev);
        // setLev1(false)
    }


    return(
        <>
            <h1>마이페이지</h1>
            <button value={isUserInfoClick} onClick={onUserInfoView}>회원 정보</button>
            <button value={isUserAddressClick} onClick={onUserAddressView}>배송지</button>
            <button value={isUserOrderListClick} onClick={onOUserOrderListView}>주문 내역</button>
            
            {isUserInfoClick ? <UserInfo /> : null}
            {isUserAddressClick ? <UserAddress /> : null}
            {isUserOrderListClick ? <UserOrderList /> : null}
        </>
    )
}

export default MyPage;