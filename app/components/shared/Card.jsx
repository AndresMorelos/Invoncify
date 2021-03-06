// Libraries
import React from 'react';

// Styles
import styled from 'styled-components';

const CardStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  border: 1px solid #f2f3f4;
  margin-bottom: 30px;
`;

const CardBodyStyle = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

const CardTitleStyle = styled.h4`
  margin-bottom: 0.75rem;
`;

const CardSubtitleStyle = styled.h6`
  color: #868e96;
  margin-top: -0.375rem;
  margin-bottom: 0.5rem;
`;

const CardTextStyle = styled.p``;

// Components
export const Card = function ({ children }) {
  return <CardStyle>{children}</CardStyle>
}

export const CardBody = function ({ children }) {
  return <CardBodyStyle>{children}</CardBodyStyle>
}

export const CardTitle = function ({ children }) {
  return <CardTitleStyle>{children}</CardTitleStyle>
}

export const CardSubtitle = function ({ children }) {
  return <CardSubtitleStyle>{children}</CardSubtitleStyle>
}

export const CardText = function ({ children }) {
  return <CardTextStyle>{children}</CardTextStyle>
}
