import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  align-items: center;
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

const Button = styled(Link)``;

export default function Navigation() {
  const user = useSelector(selectUser);

  const renderLoggedIn = (
    <div>
      <Avatar src={user.picture} alt={user.name} />
      <Button to="/projects/new">Upload</Button>
    </div>
  );

  const renderLoggedOut = (
    <div>
      <Button to="/login">
        <img src={require("../assets/github-logo.png")} />
        Sign in/up
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
