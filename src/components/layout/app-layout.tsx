import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  overflow: hidden;
  background-color: #eee;
`;

const Content = styled.div`
  box-sizing: border-box;
  width: 95%;
  max-width: 700px;
  margin: 40px auto;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 25px 50px 50px 50px;
`;

const AppLayout = () => (
  <Main>
    <Content>
      <Outlet />
    </Content>
  </Main>
);

export default AppLayout;
