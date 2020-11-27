import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import OptionField from '../OptionField/OptionField.jsx';

const OptionFieldsContainer = styled.div`
  width: 90%;
  box-sizing: border-box;
  display: block;
  margin: 10px auto;
`;

const ButtonContainer = styled.div`
  grid-column-start: 3;
  text-align: right;
  margin: 30px 40px 30px 0;
`;

const OptionFields = (props) => (
  <OptionFieldsContainer>
    {props.options !== null &&
      props.options.map((option, index) => (
        <div key={index}>
          <OptionField
            change={props.change}
            option={option}
            index={index}
            addEntry={props.addEntry}
            removeEntry={props.removeEntry}
          />
        </div>
      ))}
    <ButtonContainer>
      <button onClick={() => props.addEntry()}>Uusi vastaus</button>
    </ButtonContainer>
  </OptionFieldsContainer>
);

OptionFields.propTypes = {
  options: propTypes.array,
  change: propTypes.func,
  addEntry: propTypes.func,
  removeEntry: propTypes.func,
};

export default OptionFields;
