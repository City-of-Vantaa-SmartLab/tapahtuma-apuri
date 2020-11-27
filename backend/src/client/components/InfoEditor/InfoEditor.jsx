import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import apiUrl from '../../util/apiUrl.js';

import Alert from '../Alert/Alert.jsx';

const TextArea = styled.textarea`
  border: 1px solid #888;
  font-size: 1em;
  height: 5em;
  margin-bottom: 30px;
  padding: 5px;
  resize: none;
  width: 100%;
`;

class InfoEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      info: {
        emptyGreetingHeader: '',
        emptyGreetingBody: '',
        readyGreetingHeader: '',
        readyGreetingBody: '',
        privateGreetingHeader: '',
        privateGreetingBody: '',
      },
      alert: {
        status: '',
        header: '',
        text: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    fetch(`${apiUrl()}/getInfo`)
      .then((res) => res.json())
      .then((res) => {
        delete res.id;
        this.setState({ info: res });
      });
  }

  handleChange(e) {
    e.persist();
    this.setState((state) => {
      state.info[e.target.id] = e.target.value;
      return state;
    });
  }

  save() {
    fetch(`${apiUrl()}/saveInfo?infos=${JSON.stringify(this.state.info)}`, {
      method: 'POST',
    })
      .then(() =>
        this.setState((state) => {
          state.alert = {
            status: 'success',
            header: 'Tallennettu',
            text: 'Tekstit tallennettu onnistuneesti',
          };
          return state;
        })
      )
      .catch(() => {
        this.setState((state) => {
          state.alert = {
            status: 'error',
            header: 'Virhe',
            text: 'Tekstien tallentaminen ei onnistunut',
          };
          return state;
        });
      });
  }

  render() {
    return (
      <div>
        {!_.isEmpty(this.state.alert.status) && (
          <Alert
            status={this.state.alert.status}
            header={this.state.alert.header}
            text={this.state.alert.text}
          />
        )}
        <b>Tyhjän muistilistan infoteksti:</b>
        <input
          onChange={this.handleChange}
          value={this.state.info.emptyGreetingHeader}
          id="emptyGreetingHeader"
        />
        <TextArea
          onChange={this.handleChange}
          value={this.state.info.emptyGreetingBody}
          id="emptyGreetingBody"
        />
        <b> Täytetyn muistilistan infoteksti: </b>
        <input
          onChange={this.handleChange}
          value={this.state.info.readyGreetingHeader}
          id="readyGreetingHeader"
        />
        <TextArea
          onChange={this.handleChange}
          value={this.state.info.readyGreetingBody}
          id="readyGreetingBody"
        />
        <b> Yksityistapahtuman infoteksti: </b>
        <input
          onChange={this.handleChange}
          value={this.state.info.privateGreetingHeader}
          id="privateGreetingHeader"
        />
        <TextArea
          onChange={this.handleChange}
          value={this.state.info.privateGreetingBody}
          id="privateGreetingBody"
        />
        <button onClick={this.save}> Tallenna </button>
      </div>
    );
  }
}

export default InfoEditor;
