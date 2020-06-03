import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import { ChatFill, HeartFill } from "react-bootstrap-icons";

import { ReactComponent as ArrowUpIcon } from "../assets/arrow-up.svg";

import useNumLikes from "../hooks/useNumLikes";

const Container = styled.div`
  background: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 200ms ease-in-out;
  text-decoration: none;
  position: relative;

  &:hover {
    transform: scale(1.015);
    box-shadow: 0px 20px 30px rgba(116, 116, 116, 0.15);
    text-decoration: none;
  }
`;

const PostLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Preview = styled.div`
  width: 240px;
  height: 135px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;

  @media (max-width: 780px) {
    width: 120px;
    height: 140px;
  }
`;

const Content = styled.div`
  margin-left: 30px;
  flex: 1;
`;

const Title = styled.h3`
  color: #292f3f;
  font-size: 26px;
  line-height: 33px;
  font-weight: 600;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 780px) {
    font-size: 21px;
    line-height: 26px;
  }
`;

const Description = styled.p`
  color: #707580;
  font-size: 19px;
  margin-top: 8px;
  font-weight: 500;
`;

const Meta = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MetaMobile = styled.div`
  display: none;
`;

const Avatar = styled.img`
  margin-right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid #fff;
`;

const Info = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #b3b7c1;

  & span:nth-of-type(2) {
    margin: 0 10px;
  }
`;

const Votes = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 400ms ease;
  border-radius: 8px;
  max-width: 95px;
  padding: 8px;
  z-index: 999;
`;

const Button = styled.button`
  border: 0;
  background: transparent;
  transition: all 400ms ease;
`;

const VoteCount = styled.p`
  font-weight: 700;
  color: #292f3f;
  margin: 0 auto;
  text-align: center;
  cursor: default;
  background: #f5f6f7;
  border-radius: 10px;
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 12px 0;
  width: 65px;
`;

export default function PostItem({
  _id,
  title,
  description,
  author,
  image,
  children,
}) {
  const [numLikes, setNumLikes] = useState(0);

  useEffect(() => {
    fetchLikeNumber();
  }, [_id]);

  const fetchLikeNumber = async () => {
    try {
      const response = await axios.get(`/likes/${_id}/count`);
      setNumLikes(response.data);
    } catch (error) {
      throw Error(error);
    }
  };

  const handleClickLike = async () => {
    try {
      await axios.post(`/likes/${_id}`);
      fetchLikeNumber();
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <Container>
      <PostLink to={`/projects/${_id}`} />
      <Preview style={{ backgroundImage: `url(${image})` }} />
      <Content>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <Meta>
          <Avatar className="avatar" alt={author.name} src={author.picture} />
          <Info>
            <span>{author.name}</span>
            <span>•</span>
            <span>19 hours ago</span>
          </Info>
          <MetaMobile>
            <Avatar className="avatar" alt={author.name} src={author.picture} />
            <Votes>
              <Button>
                <ArrowUpIcon />
              </Button>
              <VoteCount>{numLikes}</VoteCount>
            </Votes>
          </MetaMobile>
        </Meta>
      </Content>
      <Votes>
        <Button onClick={handleClickLike}>
          <ArrowUpIcon />
        </Button>
        <VoteCount>{numLikes}</VoteCount>
      </Votes>
    </Container>
  );
}
