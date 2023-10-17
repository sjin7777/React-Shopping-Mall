import { useNavigate } from "react-router";

function Header() {
    const navigate = useNavigate();
    return(
        <>
            <header>
                <button onClick={() => navigate("/")}>Home</button>
            </header>
            <nav>
                <button onClick={() => navigate("/join")}>회원가입</button>
                <button onClick={() => navigate("/login")}>로그인</button>
            </nav>
        {/* 
            <nav>
                <button onClick={() => navigate("/user/mypage")}>마이페이지</button>
                <button onClick={() => navigate("/user/cartlist")}>장바구니</button>
                <button>로그아웃</button>
            </nav>
        */}
        </>
    )
}

export default Header;