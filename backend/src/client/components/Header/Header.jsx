import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: block;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  margin-bottom: 30px;
  background: #4a4a4a;
  color: white;
  padding: 20px;
  text-align: left;
  display: flex;
`;

const Right = styled.div`
  margin-left: auto;
  text-decoration: underline;
`;

const Header = () => (
  <HeaderContainer>
    <b>Tapahtuma-apuri</b>
    &nbsp;Admin
    <Right>
      <Link
        style={{ color: 'white' }}
        to={window.location.pathname === '/editInfos' ? '/' : '/editInfos'}
      >
        {window.location.pathname === '/editInfos'
          ? 'Kyselyn muokkaus'
          : 'Infotekstien muokkaus'}
      </Link>
    </Right>
  </HeaderContainer>
);

export default Header;
