import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

import { selectUser } from "../reducers/authSlice";

import withNavigation from "../hocs/withNavigation";

import Introduction from "../components/Introduction";
import PostItem from "../components/PostItem";

function LandingPage() {
  const user = useSelector(selectUser);
  const [projectFeed, setProjectFeed] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchProjecFeed = async () => {
      const { data: feed } = await axios.get("/posts/all");
      if (mounted) setProjectFeed(feed);
    };
    fetchProjecFeed();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    document.title =
      "Rumbbble - Discover the World's Top Developers and Programming Enthusiasts";
  }, []);

  const renderPostItems = () =>
    projectFeed.map((props) => (
      <PostItem key={props._id} {...props}>
        <div>Hello</div>
        <Introduction />
      </PostItem>
    ));

  return (
    <Fragment>
      {!user && <Introduction />}
      <Container className="px-sm-0">{renderPostItems()}</Container>
    </Fragment>
  );
}

export default withNavigation(LandingPage);
