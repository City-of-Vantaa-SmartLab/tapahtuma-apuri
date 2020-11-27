import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const TextAreaContainer = styled.div`
  width: 90%;
  border: 1px solid black;
  box-sizing: border-box;
  display: block;
  margin: 10px auto;
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;

const TextArea = styled.textarea`
    border: 1px solid #888;
    width: 100%
    height: 5em;
    font-size: 1em;
    resize: none;
    padding: 5px;
`;

const InfoTextField = (props) => (
  <TextAreaContainer>
    Merkintöihin lisättävä infoteksti
    <TextArea
      className={props.info.length === 0 && 'error'}
      id="info"
      value={props.info}
      onChange={props.change}
    />
  </TextAreaContainer>
);

InfoTextField.propTypes = {
  info: propTypes.string,
  change: propTypes.func,
};

export default InfoTextField;
