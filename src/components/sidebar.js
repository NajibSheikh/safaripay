import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./routes/sidebarData";
import SubMenu from "./routes/subMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  background: #2596be;
  height: 80px;
  display: start;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #2596be;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const LogoutButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: right;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  margin-left: auto;
  margin-right: 12px;
  border-radius: 10px;
  border: none;
  background-color: #343535;
  color: #fff;
  &:hover {
    background-color: #555;
    color: white;
  }
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    // perform logout operation here, e.g. clear user session/token
    // and redirect to login page
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <LogoutButton onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </LogoutButton>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
