import React from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import BasicFields from './BasicFields/BasicFields.jsx';
import OptionFields from './OptionFields/OptionFields.jsx';
import InfoTextField from './InfoTextField/InfoTextField.jsx';
import QuestionEditorHeader from './QuestionEditorHeader/QuestionEditorHeader.jsx';
import Alert from '../Alert/Alert.jsx';
import DeleteModal from '../DeleteModal/DeleteModal.jsx';

import apiUrl from '../../util/apiUrl';

const memoTemplate = {
  text: '',
  link: '',
  additional_infos: ['', ''],
};

const optionTemplate = {
  text: '',
  forward_to: undefined,
  memos: [],
};

const questionTemplate = {
  title: '',
  info: '',
  question_ordinal_first: '',
  question_ordinal_second: '',
  question_ordinal_third: '',
  options: [JSON.parse(JSON.stringify(optionTemplate))],
};

const alertState = {
  response: {
    status: undefined,
    header: undefined,
    text: undefined,
  },
};

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    if (props.match.params.id === undefined) {
      this.state = Object.assign(questionTemplate, alertState, {
        ready: true,
        modalOpen: false,
      });
    } else {
      this.state = { ready: false };
      this.getQuestion(props.match.params.id);
    }
    this.handleChange = this.handleChange.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }

  getQuestion(id) {
    fetch(`${apiUrl()}/getQuestions?id=${id}`)
      .then((response) => response.json())
      .then((res) =>
        this.setState(Object.assign(res, alertState, { ready: true }))
      );
  }

  handleChange(
    e,
    optionIndex,
    memoIndex,
    additional_infosIndex,
    memoFieldType
  ) {
    e.persist(); // To keep the HTML even alive during logic
    this.setState((state) => {
      memoIndex !== undefined // If we have an index for list(memos/additional_infos) we want to change them
        ? additional_infosIndex !== undefined
          ? (state.options[optionIndex].memos[memoIndex].additional_infos[
              additional_infosIndex
            ] = e.target.value)
          : (state.options[optionIndex].memos[memoIndex][memoFieldType] =
              e.target.value)
        : optionIndex !== undefined //If we have an optionIndex, we want to change the options
        ? (state.options[optionIndex][e.target.id] =
            e.target.value === 'remove' ? undefined : e.target.value)
        : (state[e.target.id] = e.target.value);
      return state;
    });
  }

  addEntry(optionIndex, memoIndex) {
    this.setState((state) => {
      memoIndex !== undefined
        ? state.options[optionIndex].memos[memoIndex].additional_infos.push(
            '',
            ''
          )
        : optionIndex !== undefined
        ? state.options[optionIndex].memos !== null
          ? state.options[optionIndex].memos.push(
              JSON.parse(JSON.stringify(memoTemplate))
            )
          : (state.options[optionIndex].memos = [
              JSON.parse(JSON.stringify(memoTemplate)),
            ])
        : state.options === null
        ? (state.options = [JSON.parse(JSON.stringify(optionTemplate))])
        : state.options.push(JSON.parse(JSON.stringify(optionTemplate))); // Deep copy
      return state;
    });
  }

  removeEntry(optionIndex, memoIndex, additional_infosIndex) {
    this.setState((state) => {
      additional_infosIndex !== undefined
        ? state.options[optionIndex].memos[memoIndex].additional_infos.splice(
            additional_infosIndex - 1,
            2
          )
        : memoIndex !== undefined
        ? state.options[optionIndex].memos.splice(memoIndex, 1)
        : optionIndex !== undefined && state.options.splice(optionIndex, 1);
      return state;
    });
  }

  save() {
    fetch(
      `${apiUrl()}/${
        this.state.id // Check if id exists for the question. If yes, this question exists in database so we update it instead of creating.
          ? `updateQuestion?id=${this.state.id}&`
          : 'createQuestion?'
      }
		title=${this.state.title}&
		info=${this.state.info}&
		question_ordinal_first=${this.state.question_ordinal_first}&
		question_ordinal_second=${this.state.question_ordinal_second}&
		question_ordinal_third=${this.state.question_ordinal_third}&
		options=${JSON.stringify(this.state.options)}
		`,
      { credentials: 'include' }
    )
      .then((response) => response.json())
      .then((res) =>
        this.state.id
          ? this.setState({
              response: {
                status: 'success',
                header: 'Tallennettu!',
                text: 'Tallennettu onnistuneesti',
              },
            })
          : (window.location.href = `${window.location.origin}/editQuestion/${res.id}?new`)
      )
      .catch(() =>
        this.setState({
          response: {
            status: 'error',
            header: 'Virhe!',
            text: 'Tallentaminen ei onnistunut!',
          },
        })
      );
  }

  delete() {
    fetch(`${apiUrl()}/deleteQuestion?id=${this.state.id}`, {
      credentials: 'include',
    })
      .then(() => (window.location.href = `${window.location.origin}?delete`))
      .catch(() =>
        this.setState({
          response: {
            status: 'error',
            header: 'Virhe!',
            text: 'Poistaminen ei onnistunut!',
          },
        })
      );
  }

  render() {
    if (this.state.ready) {
      return (
        <div>
          <DeleteModal
            isOpen={this.state.modalOpen}
            id={this.state.id}
            delete={this.delete}
            error={() =>
              this.setState({
                response: {
                  status: 'error',
                  header: 'Virhe!',
                  text: 'Poistaminen ei onnistunut!',
                },
              })
            }
          />
          <Alert
            header={this.state.response.header}
            text={this.state.response.text}
            status={this.state.response.status}
          />
          {this.props.location.search.includes('new') && (
            <Alert
              header="Kysymys tallennettu!"
              text="Kysymys on tallennettu ja sitä voi nyt käyttää kyselyn osana."
              status="success"
            />
          )}
          <QuestionEditorHeader
            save={this.save}
            delete={() => this.setState({ modalOpen: true })}
          />
          <BasicFields
            title={this.state.title}
            question_ordinal_first={this.state.question_ordinal_first}
            question_ordinal_second={this.state.question_ordinal_second}
            question_ordinal_third={this.state.question_ordinal_third}
            change={this.handleChange}
          />
          <OptionFields
            options={this.state.options}
            change={this.handleChange}
            addEntry={this.addEntry}
            removeEntry={this.removeEntry}
          />
          <InfoTextField info={this.state.info} change={this.handleChange} />
        </div>
      );
    } else {
      return <h1> loading </h1>;
    }
  }
}

QuestionEditor.propTypes = {
  match: propTypes.any,
};

export default QuestionEditor;
