import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { userModify } from "../../../modules/user";

function MyPage() {
    const dispatch = useDispatch();
    const storeUserId = useSelector((state) => ({token: state.token }), shallowEqual).token.userId
    const [ address, setAddres ] = useState("");
    return(
        <>
            <h1>마이페이지</h1>

            <div>
                <label>배송지</label>
                <input type="text" value={address} onChange={(e) => setAddres(e.target.value)}/>
                <button onClick={() => dispatch(userModify(storeUserId, address))}>저장</button>
            </div>
        </>
    )
}

export default MyPage;