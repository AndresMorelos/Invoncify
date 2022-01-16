// Libraries
import React from 'react';

// Styles
import styled from 'styled-components';

const LoginWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
}
`;

const AppWrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const AppMainContentStyle = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  background: #f9fafa;
`;

const PageWrapperStyle = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PageHeaderStyle = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px 120px 10px 40px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const PageHeaderTitleStyle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.5px;
`;

const PageHeaderActionsStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
  i {
    margin-right: 10px;
  }
`;

const PageContentStyle = styled.div`
  // flex: 1;
  // overflow: hidden;
  margin: 90px 40px 40px 40px;
  ${(props) =>
    !props.bare &&
    `
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 4px;
    background: #FFF;
  `};
`;

const PageFooterStyle = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #f9fafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

// Components
const LoginWrapper = function (props) {
  const { children } = props;
  return <LoginWrapperStyle>{children}</LoginWrapperStyle>;
};

const AppWrapper = function (props) {
  const { children } = props;
  return <AppWrapperStyle>{children}</AppWrapperStyle>;
};

const AppMainContent = function (props) {
  const { children } = props;
  return <AppMainContentStyle>{children}</AppMainContentStyle>;
};

const PageWrapper = function (props) {
  const { children } = props;
  return <PageWrapperStyle>{children}</PageWrapperStyle>;
};

const PageHeader = function (props) {
  const { children } = props;
  return <PageHeaderStyle>{children}</PageHeaderStyle>;
};

const PageHeaderTitle = function (props) {
  const { children } = props;
  return <PageHeaderTitleStyle>{children}</PageHeaderTitleStyle>;
};

const PageHeaderActions = function (props) {
  const { children } = props;
  return <PageHeaderActionsStyle>{children}</PageHeaderActionsStyle>;
};

const PageContent = function (props) {
  const { children, bare } = props;
  return <PageContentStyle bare={bare}>{children}</PageContentStyle>;
};

const PageFooter = function (props) {
  const { children } = props;
  return <PageFooterStyle>{children}</PageFooterStyle>;
};

export {
  LoginWrapper,
  AppWrapper,
  AppMainContent,
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
  PageFooter,
};
