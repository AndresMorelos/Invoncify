// Libraries
import React from 'react';

// Styles
import styled from 'styled-components';

const TabsStyle = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const TabStyle = styled.a`
  background: #f9fbfa;
  text-decoration: none;
  color: #292b2c;
  font-weight: 400;
  font-size: 16px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  &:last-child {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  &.active {
    background: #fff;
    border-bottom: 1px solid #fff;
  }
  &:hover {
    text-decoration: none;
    color: #292b2c;
  }
`;

const TabContentStyle = styled.div`
  padding: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: -1px;
  border-top-left-radius: 0;
`;

// Components
const Tab = function (props) {
  const { children } = props;
  return <TabStyle {...props}>{children}</TabStyle>;
};

const TabContent = function (props) {
  const { children } = props;
  return <TabContentStyle>{children}</TabContentStyle>;
};

const Tabs = function (props) {
  const { children } = props;
  return <TabsStyle>{children}</TabsStyle>;
};

export { Tab, Tabs, TabContent };
