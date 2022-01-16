// Libraries
import React from 'react';

// Styles
import styled from 'styled-components';

const PartStyle = styled.div`
  padding: 20px 20px 10px 20px;
  background: #f9fafa;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f2f3f4;
`;

const RowStyle = styled.div`
  display: flex;
  margin: 0 -15px;
`;

const FieldStyle = styled.div`
  flex: 1;
  margin: 0 15px 20px 15px;
`;

const HeaderStyle = styled.h2``;

// Components
export const Part = function (props) {
  const { children } = props;
  return <PartStyle>{children}</PartStyle>;
};
export const Header = function (props) {
  const { children } = props;
  return <HeaderStyle>{children}</HeaderStyle>;
};
export const Field = function (props) {
  const { children } = props;
  return <FieldStyle>{children}</FieldStyle>;
};
export const Row = function (props) {
  const { children } = props;
  return <RowStyle>{children}</RowStyle>;
};
