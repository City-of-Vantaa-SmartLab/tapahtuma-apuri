import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const BasicFieldContainer = styled.div`
  width: 90%;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  margin: 10px auto;
  font-weight: bold;
  text-align: left;
`;

const IdInput = styled.div`
  width: 7%;
  margin: 10px;
`;

const TitleInput = styled.div`
  width: 100%;
  margin: 10px;
`;

const BasicFields = (props) => (
  <BasicFieldContainer>
    <IdInput>
      #
      <input
        className={
          !Number.isInteger(parseInt(props.question_ordinal_first)) ||
          props.question_ordinal_first < 0
            ? 'error'
            : ''
        }
        id="question_ordinal_first"
        type="string"
        onChange={props.change}
        value={props.question_ordinal_first}
      />
    </IdInput>
    <IdInput>
      #
      <input
        id="question_ordinal_second"
        type="string"
        onChange={props.change}
        value={props.question_ordinal_second}
      />
    </IdInput>
    <IdInput>
      #
      <input
        id="question_ordinal_third"
        type="string"
        onChange={props.change}
        value={props.question_ordinal_third}
      />
    </IdInput>
    <TitleInput>
      Kysymys
      <input
        className={props.title.length === 0 ? 'error' : ''}
        id="title"
        type="text"
        onChange={props.change}
        value={props.title}
      />
    </TitleInput>
  </BasicFieldContainer>
);

BasicFields.propTypes = {
  title: propTypes.string,
  question_ordinal_first: propTypes.any,
  question_ordinal_second: propTypes.any,
  question_ordinal_third: propTypes.any,
  change: propTypes.func,
};

export default BasicFields;
