import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const AlertContainer = styled.div`
  height: auto;
  padding: 10px;
  width: 80%;
  margin: auto;
  border: 1px solid black;
  text-align: left;
`;

const Alert = (props) =>
  props.status ? (
    <AlertContainer className={props.status}>
      <b>{props.header}</b> {props.text}
    </AlertContainer>
  ) : null;

Alert.propTypes = {
  status: propTypes.string,
  header: propTypes.string,
  text: propTypes.string,
};

export default Alert;
