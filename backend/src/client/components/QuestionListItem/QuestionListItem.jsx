import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import styled from 'styled-components';

import apiUrl from '../../util/apiUrl';
import convertIdToSem from '../../util/convertIdToSem';

import DeleteModal from '../DeleteModal/DeleteModal.jsx';

const QuestionCell = styled.div`
  width: auto;
  border: 1px solid black;
  border-left: ${(props) => props.level === 'first' && '5px solid black'};
  margin-bottom: 10px;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-left: ${(props) =>
    props.level === 'first'
      ? '0px'
      : props.level === 'second'
      ? '10px'
      : '20px'};
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

const QuestionListItem = (props) => (
  <div>
    <QuestionCell
      level={
        props.question.question_ordinal_third
          ? 'third'
          : props.question.question_ordinal_second
          ? 'second'
          : 'first'
      }
    >
      <BasicInformation question={props.question} />
      <DeleteButton
        id={props.question.id}
        update={props.update}
        error={props.error}
      />
    </QuestionCell>
  </div>
);

const BasicInformation = (props) => (
  <LeftSide>
    <Link to={`/editQuestion/${props.question.id}`}>
      <b>
        {convertIdToSem(
          props.question.question_ordinal_first,
          props.question.question_ordinal_second,
          props.question.question_ordinal_third
        )}
      </b>
      {props.question.title}
    </Link>
  </LeftSide>
);

class DeleteButton extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
  }

  deleteQuestion(id, update, error) {
    fetch(`${apiUrl()}/deleteQuestion?id=${id}`, { credentials: 'include' })
      .then(() => update())
      .catch(() => error());
  }
  openModal() {
    this.setState({ open: true });
  }

  render() {
    return (
      <RightSide>
        <DeleteModal
          isOpen={this.state.open}
          id={this.props.id}
          delete={this.deleteQuestion}
          update={this.props.update}
          error={this.props.update}
        />
        <span onClick={this.openModal}>Poista</span>
      </RightSide>
    );
  }
}

QuestionListItem.propTypes = {
  question: propTypes.any,
  update: propTypes.func,
  error: propTypes.func,
};

BasicInformation.propTypes = {
  question: propTypes.any,
};

DeleteButton.propTypes = {
  id: propTypes.number,
  update: propTypes.func,
  error: propTypes.func,
};

export default QuestionListItem;
