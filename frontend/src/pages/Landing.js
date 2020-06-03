import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import withNavigation from "../hocs/withNavigation";

import Introduction from "../components/Introduction";
import PostItem from "../components/PostItem";

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 46px 0 60px 0;

  & h1 {
    margin: 0 15px 0 0;
    font-weight: 500;
  }

  @media (max-width: 780px) {
    flex-flow: column;
  }
`;

function LandingPage() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchFeed = async () => {
      if (!mounted) return;
      const { data } = await axios.get("/posts/all");
      setFeed(data);
    };
    fetchFeed();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    document.title = "Top Posts — Rumbbble";
  }, []);

  const renderPostItems = feed.map((props) => (
    <PostItem key={props._id} {...props} />
  ));

  return (
    <Container>
      <Intro>
        <h1>Top programming projects sorted by</h1>
        <select name="sort">
          <option value="new">new</option>
          <option value="likes">likes</option>
          <option value="comments">comments</option>
          <option value="oldest">oldest</option>
        </select>
      </Intro>
      {renderPostItems}
    </Container>
  );
}

export default withNavigation(LandingPage);
