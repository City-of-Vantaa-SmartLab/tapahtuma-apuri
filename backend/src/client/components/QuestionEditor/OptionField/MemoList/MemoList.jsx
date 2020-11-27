import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import isOdd from '../../../../util/isOdd';

const ListItemContainer = styled.div`
  grid-column-start: ${(props) => (props.right ? '3' : '2')};
  margin-left: ${(props) => (props.indent ? '10%' : '0')};
`;

const InputContainer = styled.div`
  width: ${(props) => props.width}%;
  margin-right: auto;
`;

const Aux = (props) => props.children;

class MemoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.change(
      e,
      this.props.optionIndex,
      this.props.memoIndex,
      undefined,
      e.target.id
    );
  }

  render() {
    return (
      <Aux>
        <ListItemContainer>Merkinnän teksti</ListItemContainer>
        <ListItemContainer right>Lomake-linkki</ListItemContainer>
        <ListItemContainer>
          <InputContainer width={'90'}>
            <input
              className={this.props.data.text.length === 0 ? 'error' : ''}
              type="text"
              id="text"
              value={this.props.data.text}
              onChange={this.handleChange}
            />
          </InputContainer>
        </ListItemContainer>
        <ListItemContainer right>
          <InputContainer width={'90'}>
            <input
              className={this.props.data.link.length === 0 ? 'error' : ''}
              type="text"
              id="link"
              value={this.props.data.link}
              onChange={this.handleChange}
            />
          </InputContainer>
          <span
            onClick={() =>
              this.props.removeEntry(
                this.props.optionIndex,
                this.props.memoIndex
              )
            }
          >
            [x]
          </span>
        </ListItemContainer>
        <ListItemContainer indent>Infolinkkien tekstit</ListItemContainer>
        <ListItemContainer right>Infolinkkien URL</ListItemContainer>
        {this.props.data.additional_infos.map((text, index) => (
          <ListItemContainer
            indent={!isOdd(index)}
            right={isOdd(index)}
            key={index}
          >
            <InputContainer width={'90'}>
              <input
                className={text.length === 0 ? 'error' : ''}
                type="text"
                value={text}
                onChange={(e) =>
                  this.props.change(
                    e,
                    this.props.optionIndex,
                    this.props.memoIndex,
                    index,
                    undefined
                  )
                }
              />
            </InputContainer>
            <span
              onClick={() =>
                this.props.removeEntry(
                  this.props.optionIndex,
                  this.props.memoIndex,
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
              this.props.addEntry(this.props.optionIndex, this.props.memoIndex)
            }
          >
            Lisää merkintään infolinkki
          </span>
        </ListItemContainer>
      </Aux>
    );
  }
}

MemoList.propTypes = {
  data: propTypes.any,
  change: propTypes.func,
  optionIndex: propTypes.number,
  addEntry: propTypes.func,
  removeEntry: propTypes.func,
  memoIndex: propTypes.number,
};

export default MemoList;
