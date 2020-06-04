import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  align-items: center;
`;

const Content = styled.input`
  flex: 1 0 auto;
  margin-right: 20px;
  font-size: 18px;
  color: #292f3f;
  height: 50px;
  border: 0;
  background: transparent;
`;

const Submit = styled.button`
  border-radius: 50px;
  font-size: 17px;
  letter-spacing: normal;
  text-transform: none;
  padding: 6px 15px;
  outline: none;
`;

export default function CommentForm({ projectId, submitComment }) {
  const [formData, setFormData] = useState("");

  const handleChange = ({ target: { value } }) => setFormData(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    submitComment(formData);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Content
        required
        type="text"
        name="comment"
        placeholder="Write a comment..."
        onChange={handleChange}
        value={formData}
      />
      <Submit>Post</Submit>
    </Container>
  );
}
