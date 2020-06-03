import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import { ReactComponent as LogoSVG } from "../assets/logo.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

import { selectUser } from "../reducers/authSlice";

const Header = styled.header`
  padding: 40px 0px 24px 0px;
  font-weight: 600;
`;

const Container = styled.div`
  width: 90%;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
  }
`;

const Logo = styled(LogoSVG)`
  width: 80px;
  height: auto;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

export default function Navigation() {
  const user = useSelector(selectUser);

  const renderLoggedIn = (
    <div>
      <NavDropdown
        id="profile-dropdown"
        title={<Avatar src={user.picture} className="avatar" alt={user.name} />}
      >
        <NavDropdown.Item href="/auth/logout">Sign Out</NavDropdown.Item>
      </NavDropdown>
      <Button className="ml-2" variant="primary" href="/projects/new">
        Upload
      </Button>
    </div>
  );

  const renderLoggedOut = (
    <div>
      <Nav.Link href="/login">Sign in</Nav.Link>
      <Button
        className="d-none d-lg-block d-xl-block ml-3"
        variant="primary"
        href="/login"
      >
        Sign up
      </Button>
    </div>
  );

  return (
    <Header>
      <Container>
        <a className="logo" href="/">
          <Logo />
        </a>
        {user ? renderLoggedIn : renderLoggedOut}
      </Container>
    </Header>
  );
}
