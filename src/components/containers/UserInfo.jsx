import UserPwdCk from "./UserPwdCk";
import UserInfoModify from "./UserInfoModify";

function UserInfo({subType}) {
    switch(subType) {
        case "userPwdCk":
            return <UserPwdCk />
        case "userInfoModify":
            return <UserInfoModify />
        default:
            return <UserPwdCk />
    }
}

export default UserInfo;