import styled from "styled-components";

const HeaderContainer = styled.header`
    position: sticky;
    width: 100%;
    top: 0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    background-color: cornflowerblue;
`;

export const HeaderLogo = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 1rem;
`;

export const HeaderNav = styled.nav`
    
`;

export const HeaderNavMenu = styled.ul`
    display: flex;
    gap: 4px;
`;

export const HeaderNavMenuItem = styled.li`
    padding: 8px 16px;
    color: white;
    cursor: pointer;
`;


export default HeaderContainer;