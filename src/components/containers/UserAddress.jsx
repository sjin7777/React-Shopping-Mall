import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userAddAddress, userDelAddress, userMainAddress } from "../../modules/user";

function UserAddress() {
    const dispatch = useDispatch();
    const [ newAddress, setNewAddress ] = useState("");
    const storeUserId = useSelector((state) => ({token: state.token }), shallowEqual).token.userId
    const storeUser = useSelector((state) => ({user: state.user}), shallowEqual).user.userInfo;
    const storeUserArray = Array.isArray(storeUser) ? storeUser[0] : storeUser;
    const storeUserAddressMain = storeUserArray.address;
    const storeUserAddressList = storeUserArray.addressList;


    const onAddAddressHandler = () => {
        if(storeUserAddressList.some((address) => address === newAddress)) {
            alert("이미 존재하는 배송지입니다")
            setNewAddress("");
        } else {
            dispatch(userAddAddress(storeUserId, newAddress))
            if(window.confirm("등록하신 배송지를 기본 배송지로 설정하시겠습니까?")) dispatch(userMainAddress(storeUserId, newAddress))  
        }
    }
    

    const onDelAddressHandler = (address) => {
        dispatch(userDelAddress(storeUserId, address));
        (address === storeUserAddressMain) && dispatch(userMainAddress(storeUserId, null))
    }

    return(
        <>
            <div style={{padding: "20px"}}>
                <label>새로운 배송지</label>
                <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)}/>
                <button disabled={storeUserAddressList.length > 4} onClick={onAddAddressHandler}>저장</button>
            </div>
            <div style={{border: "solid 1px black"}}>
                <div>
                    <label>기본 배송지</label>
                    <p>{(storeUserAddressMain) ? storeUserAddressMain : "기본 배송지를 등록해주세요"}</p>
                </div>
            </div>
            <div style={{border: "solid 1px black"}}>
                <label>등록된 배송지</label>
                {storeUserAddressList.map((address, index) => (
                    <div key={index} style={{width: "500px", height: "50px"}}>
                        <div style={{width: "300px"}}>{address}</div>
                        <span style={ (address === storeUserAddressMain) ? {display: "inline"} : {display: "none"}}>현재 배송지</span>
                        <button onClick={() => dispatch(userMainAddress(storeUserId, address))} style={ (address !== storeUserAddressMain) ? {display: "inline"} : {display: "none"}}>기본 배송지로 설정</button>
                        <button onClick={() => onDelAddressHandler(address)}>배송지 삭제</button>
                    </div>
                ))}
            </div>
        </>
    )

}

export default UserAddress;