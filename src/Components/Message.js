import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

// color를 props로 통해 받아 오도록함
const Text = styled.span`
  color: ${props => props.color};
`;

// text는 Message에 불러옴 text, color는 Message에서 props를 통해 얻은 color
const Message = ({ text, color }) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default Message;