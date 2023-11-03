import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userAddAddress, userDelAddress, userMainAddress } from "../../modules/user";
import { Button, ButtonGroup, Input } from "@mui/material";

function UserAddress() {
    const dispatch = useDispatch();
    const [ newAddress, setNewAddress ] = useState("");
    const storeUserId = useSelector((state) => ({token: state.token }), shallowEqual).token.userId
    const storeUser = useSelector((state) => ({user: state.user}), shallowEqual).user.userInfo;
    const storeUserArray = Array.isArray(storeUser) ? storeUser[0] : storeUser;
    const storeUserAddressMain = storeUserArray.address;
    const storeUserAddressList = storeUserArray.addressList;


    const onAddAddressHandler = () => {
        if(newAddress !== "" && newAddress.trim().length !== 0) {
            if(storeUserAddressList.some((address) => address === newAddress)) {
                alert("이미 존재하는 배송지입니다")
                setNewAddress("");
            } else {
                dispatch(userAddAddress(storeUserId, newAddress))
                if(window.confirm("등록하신 배송지를 기본 배송지로 설정하시겠습니까?")) dispatch(userMainAddress(storeUserId, newAddress))  
                setNewAddress("");
            }
        } else {
            alert("주소를 입력해주세요");
            setNewAddress("");
        }
    }
    

    const onDelAddressHandler = (address) => {
        dispatch(userDelAddress(storeUserId, address));
        (address === storeUserAddressMain) && dispatch(userMainAddress(storeUserId, null))
    }

    return(
        <div style={{margin: "50px"}}>
            
            <div style={{padding: "20px", textAlign: "center"}}>
                <Input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)}/>
                <Button variant="outlined" color="success" disabled={storeUserAddressList.length > 4} onClick={onAddAddressHandler}>주소 등록</Button>
            </div>
            <div style={{border: "solid 1px black"}} >
                <div>
                    <Button disabled={true}>기본 배송지</Button>
                    <p>{(storeUserAddressMain) ? storeUserAddressMain : "기본 배송지를 등록해주세요"}</p>
                </div>
            </div>
            <div style={{border: "solid 1px black"}}>
                {storeUserAddressList.map((address, index) => (
                    <div key={index} style={{ display: 'flex', height: "70px", border: "solid 1px black"}}>
                        <div style={{display:'flex', width: "300px", alignItems:'center'}}>{address}</div>
                        {/* <span style={ (address === storeUserAddressMain) ? {display: "inline"} : {display: "none"}}>기본 배송지</span> */}
                        <ButtonGroup sx={{marginLeft: 'auto'}}>
                            <Button onClick={() => dispatch(userMainAddress(storeUserId, address))} disabled={address === storeUserAddressMain}>기본 배송지로 설정</Button>
                            <Button onClick={() => onDelAddressHandler(address)}>배송지 삭제</Button>
                        </ButtonGroup>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default UserAddress;