import React, { createRef, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import withNavigation from "../hocs/withNavigation";
import PostItem from "../components/PostItem";
import { ReactComponent as ArrowDownIcon } from "../assets/arrow-down.svg";

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

const SortContainer = styled.form`
  width: auto;
  height: auto;
  background: none;
  padding-left: 0;
  position: relative;
`;

const Sort = styled.select`
  padding: 10px 45px 10px 20px;
  font-size: 2em;
  border: 3px solid #eaeaea;
  color: #292f3f;
  border-radius: 15px;
  appearance: none;
  background: transparent;
  cursor: pointer;

  & + svg {
    width: auto;
    height: 8px;
    margin-right: 20px;
    position: absolute;
    right: 0;
    margin-right: 12px;
    pointer-events: none;

    & path {
      fill: #00b2ff;
    }
  }
`;

function LandingPage() {
  const [feed, setFeed] = useState([]);
  const [selectText, setSelectText] = useState("");
  const [selectWidth, setSelectWidth] = useState(0);

  const selectRef = createRef();
  const tempSelectRef = createRef();

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

  const handleSelectResize = (event) => {
    console.log(event.target.value);
    setSelectText(event.target.value);
  };

  const renderPostItems = feed.map((props) => (
    <PostItem key={props._id} {...props} />
  ));

  return (
    <Container>
      <Intro>
        <h1>Coding projects sorted by</h1>
        <SortContainer>
          <Sort
            style={{ width: selectWidth }}
            onChange={handleSelectResize}
            ref={selectRef}
          >
            <option value="new">new</option>
            <option value="likes">likes</option>
            <option value="comments">comments</option>
            <option value="oldest">oldest</option>
          </Sort>
          <div ref={tempSelectRef}>
            <select id="width-temp-select" style={{ display: "none" }}>
              {console.log(tempSelectRef)}
              <option id="width-temp-option">{selectText}</option>
            </select>
          </div>
          <ArrowDownIcon />
        </SortContainer>
      </Intro>
      {renderPostItems}
    </Container>
  );
}

export default withNavigation(LandingPage);
