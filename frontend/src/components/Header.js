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

const Button = styled(Link)`
  border: 0;
  border-radius: 10px;
  font-size: 13px;
  letter-spacing: 2px;
  padding: 10px;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  background: #00b1ff;
  color: #fff;
  transition: background 300ms ease-in-out;
  display: flex;

  &:hover,
  &:focus,
  &:active {
    background: #00aaf5;
  }

  & img {
    width: 16px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    letter-spacing: 1.8px;
  }
`;

export default function Navigation() {
  const user = useSelector(selectUser);

  const renderLoggedIn = (
    <div>
      <Button to="/projects/new" style={{ marginRight: "25px" }}>
        + New Post
      </Button>
      <Avatar src={user.picture} alt={user.name} />
    </div>
  );

  const renderLoggedOut = (
    <div>
      <Button as="a" href="/auth/github">
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
