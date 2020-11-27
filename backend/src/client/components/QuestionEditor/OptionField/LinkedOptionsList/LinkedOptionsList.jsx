import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import isOdd from '../../../../util/isOdd';

const ListItemContainer = styled.div`
  grid-column-start: ${(props) => (props.right ? '3' : '2')};
`;

const InputContainer = styled.div`
  width: ${(props) => props.width}%;
`;

const Aux = (props) => props.children;

class LinkedOptionsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.change(e, this.props.optionIndex, this.props.type);
  }

  render() {
    return (
      <Aux>
        <ListItemContainer>{this.props.leftHeader}</ListItemContainer>
        <ListItemContainer right>{this.props.rightHeader}</ListItemContainer>
        {this.props.data.map((text, index) => (
          <ListItemContainer right={isOdd(index)} key={index}>
            <InputContainer width={'90'}>
              <input
                className={text.length === 0 ? 'error' : ''}
                id={index}
                type="text"
                value={text}
                onChange={this.handleChange}
              />
            </InputContainer>
            <span
              onClick={() =>
                this.props.removeEntry(
                  'linkedList',
                  this.props.optionIndex,
                  this.props.type,
                  index
                )
              }
            >
              {isOdd(index) ? '[x]' : ''}
            </span>
          </ListItemContainer>
        ))}
        <ListItemContainer
          right
          style={{ textAlign: 'right', marginRight: '50px' }}
        >
          <span
            id={this.props.type}
            onClick={() =>
              this.props.addEntry(
                'linkedList',
                this.props.optionIndex,
                this.props.type
              )
            }
          >
            {' '}
            Lisää rivi
          </span>
        </ListItemContainer>
      </Aux>
    );
  }
}

LinkedOptionsList.propTypes = {
  data: propTypes.array,
  leftHeader: propTypes.string,
  rightHeader: propTypes.string,
  change: propTypes.func,
  type: propTypes.string,
  optionIndex: propTypes.number,
  addEntry: propTypes.func,
  removeEntry: propTypes.func,
};

export default LinkedOptionsList;
