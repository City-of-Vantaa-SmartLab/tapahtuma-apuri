import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import propTypes from 'prop-types';

const HeaderContainer = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
`;

const RightSide = styled.div`
  width: auto;
  margin: 10px;
  font-size: 0.8em;
  text-decoration: underline;
`;

const LeftSide = styled.div`
  width: auto;
  margin: 10px;
`;

const OptionFields = (props) => (
  <HeaderContainer>
    <LeftSide>
      <Link to="/">
        <button>Kaikki kysymykset</button>
      </Link>
    </LeftSide>
    <RightSide>
      <button onClick={props.delete} style={{ marginLeft: '10px' }}>
        Poista kysymys
      </button>
      <button
        onClick={props.save}
        style={{
          backgroundColor: 'grey',
          color: 'white',
          marginLeft: '10px',
        }}
      >
        Tallenna
      </button>
    </RightSide>
  </HeaderContainer>
);

OptionFields.propTypes = {
  save: propTypes.func,
  delete: propTypes.func,
};

export default OptionFields;
