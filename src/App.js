import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/pages/Main";
import ItemDetail from "./components/pages/ItemDetail";
import Join from "./components/pages/Join";
import Login from "./components/pages/Login";
import MyPage from "./components/pages/user/MyPage";
import CartList from "./components/pages/user/CartList";
import Header from "./components/containers/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Main />} />
                <Route path="itemDetail" element={<ItemDetail />}/>

                <Route path="join" element={<Join />} />
                <Route path="Login" element={<Login />} />

                <Route path="user/mypage" element={<MyPage />}/>
                <Route path="user/cartlist" element={<CartList />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
