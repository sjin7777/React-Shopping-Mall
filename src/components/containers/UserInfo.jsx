import UserPwdCk from "./UserPwdCk";
import UserInfoModify from "./UserInfoModify";

function UserInfo({subType}) {
    const userInfoSet = (subType) => {
        switch(subType) {
            case "userInfoModify":
                return <UserInfoModify />
            default:
                return <UserPwdCk />
        }
    }
    return(
        <>
            {userInfoSet(subType)}
        </>
    )
}

export default UserInfo;