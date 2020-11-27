import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import apiUrl from '../../../util/apiUrl';
import convertIdToSem from '../../../util/convertIdToSem';
import _ from 'lodash';

import MemoList from './MemoList/MemoList.jsx';

const OptionFieldsContainer = styled.div`
  width: 95%;
  padding: 2.5%;
  margin: 10px auto;
  display: grid;
  grid-template-columns: 5% 47.5% 47.5%;
  font-weight: bold;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  text-align: left;
  border: 1px solid black;
`;

const Aux = (props) => props.children;

const InputContainer = styled.div`
  width: ${(props) => props.width}%;
  ${(props) => (props.right ? 'grid-column-start: 3' : '')};
`;

const Divider = styled.div`
  border: 1px dashed grey;
  grid-column-start: 2;
  grid-column-end: 4;
  margin: 20px 0;
`;

class OptionField extends React.Component {
  constructor() {
    super();
    this.state = { response: {} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.change(e, this.props.index);
  }

  componentDidMount() {
    fetch(`${apiUrl()}/getQuestions`)
      .then((response) => response.json())
      .then((response) => this.setState({ response }));
  }

  render() {
    return (
      <OptionFieldsContainer>
        <InputContainer
          width={'100'}
          style={{ marginTop: '10px' }}
          onClick={() => this.props.removeEntry(this.props.index)}
        >
          [x]
        </InputContainer>
        <InputContainer width={'90'}>
          Vastausteksti
          <input
            className={this.props.option.text.length === 0 ? 'error' : ''}
            id="text"
            type="text"
            value={this.props.option.text}
            onChange={this.handleChange}
          />
        </InputContainer>
        <InputContainer width={'90'}>
          Vastaus vie kysmykseen
          <select
            id="forward_to"
            value={this.props.option.forward_to}
            onChange={this.handleChange}
          >
            <option value={'remove'}> Kysymys lopetaa kyselyn </option>
            <option value={-1}> Vastaus vie Yksityistilaisuus-sivulle </option>
            {!_.isEmpty(this.state.response) &&
              this.state.response.map((question, index) => (
                <option key={index} value={question.id}>
                  {`${convertIdToSem(
                    question.question_ordinal_first,
                    question.question_ordinal_second,
                    question.question_ordinal_third
                  )} ${question.title}`}
                </option>
              ))}
          </select>
        </InputContainer>
        <Divider />
        {this.props.option.memos !== null &&
          this.props.option.memos.map((memo, index) => (
            <Aux key={index}>
              <MemoList
                data={memo}
                change={this.props.change}
                optionIndex={this.props.index}
                addEntry={this.props.addEntry}
                removeEntry={this.props.removeEntry}
                memoIndex={index}
              />
              <Divider />
            </Aux>
          ))}
        <InputContainer
          right
          style={{ textAlign: 'right', marginRight: '50px' }}
        >
          <span
            id={this.props.type}
            onClick={() => this.props.addEntry(this.props.index)}
          >
            Lisää merkintä
          </span>
        </InputContainer>
      </OptionFieldsContainer>
    );
  }
}

OptionField.propTypes = {
  option: propTypes.any,
  change: propTypes.func,
  index: propTypes.number,
  addEntry: propTypes.func,
  removeEntry: propTypes.func,
};

export default OptionField;
