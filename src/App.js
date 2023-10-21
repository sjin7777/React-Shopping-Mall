import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/containers/Header";
import Main from "./components/pages/Main";
import ItemDetail from "./components/pages/ProductDetail";
import Join from "./components/pages/Join";
import Login from "./components/pages/Login";
import MyPage from "./components/pages/user/MyPage";
import CartList from "./components/pages/user/CartList";
import OrderHistory from "./components/pages/user/OrderHistory";
import PurchaseOrder from "./components/pages/user/PurchaseOrder";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Main />} />
                <Route path="ProductDetail/:productId" element={<ItemDetail />}/>

                <Route path="Join" element={<Join />} />
                <Route path="Login" element={<Login />} />

                <Route path="user/MyPage" element={<MyPage />}/>
                <Route path="user/CartList" element={<CartList />}/>
                <Route path="user/PurchaseOrder" element={<PurchaseOrder />}/>
                <Route path="user/OrderHistory" element={<OrderHistory />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
