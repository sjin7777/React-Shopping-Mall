import { useLocation, useNavigate } from "react-router";

import UserInfo from "../../containers/UserInfo";
import UserAddress from "../../containers/UserAddress";
import UserOrderList from "../../containers/UserOrderList";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";


function MyPage() {    
    const navigate = useNavigate();
    const location = useLocation().state;
    const mainType = location.mainType;
    const subType = location.subType;

    return(
        <>
            <h1>마이페이지</h1>
            <Box sx={{width: '100%'}}>
                <TabContext value={mainType} >
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <TabList centered aria-label="lab API tabs example" >
                            <Tab label="Info" value="userInfo" onClick={() => navigate("/user/MyPage", {state: {mainType: "userInfo"}})}/>
                            <Tab label="Address" value="userAddress" onClick={() => navigate("/user/MyPage", {state: {mainType: "userAddress"}})}/>
                            <Tab label="Order List" value="userOrderList" onClick={() => navigate("/user/MyPage", {state: {mainType: "userOrderList"}})}/>
                        </TabList>
                    </Box>
                    <TabPanel value="userInfo" style={{textAlign:"center"}}><UserInfo subType={subType}/></TabPanel>
                    <TabPanel value="userAddress" ><UserAddress /></TabPanel>
                    <TabPanel value="userOrderList" ><UserOrderList /></TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default MyPage;