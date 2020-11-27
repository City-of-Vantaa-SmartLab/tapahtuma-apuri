import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import apiUrl from '../../util/apiUrl';

import QuestionListItem from '../QuestionListItem/QuestionListItem.jsx';
import Alert from '../Alert/Alert.jsx';

const ListWrapper = styled.div`
  margin-top: 30px;
  text-align: right;
`;

const Aux = (props) => props.children;

class QuestionList extends React.Component {
  constructor() {
    super();
    this.state = { questions: [], error: false };
    this.update = this.update.bind(this);
    this.error = this.error.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    fetch(`${apiUrl()}/getQuestions`)
      .then((response) => response.json())
      .then((response) => this.setState({ questions: response }))
      .catch(() => this.setState({ questions: undefined }));
  }

  error() {
    this.setState({
      error: true,
    });
  }

  render() {
    return (
      <Aux>
        {this.props.location.search.includes('delete') && (
          <Alert
            header="Kysymys poistettu!"
            text="Kysymys ja siihen liittyvät vastaukset."
            status="success"
          />
        )}
        {this.state.error && (
          <Alert
            header="Kysymystä ei voitu poistaa!"
            text="Kysymyksen poisto epäonnistui"
            status="error"
          />
        )}
        <ListWrapper>
          {this.state.questions.length > 0 &&
            this.state.questions.map((row) => (
              <QuestionListItem
                key={row.id}
                question={row}
                error={this.error}
                update={this.update}
              />
            ))}
          <Link to="/newQuestion">
            <button>Uusi kysymys</button>
          </Link>
        </ListWrapper>
      </Aux>
    );
  }
}

export default QuestionList;
