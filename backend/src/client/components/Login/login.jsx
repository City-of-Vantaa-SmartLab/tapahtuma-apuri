import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import styled from 'styled-components';

import apiUrl from '../../util/apiUrl';

const LoginWrapper = styled.div`
  width: 40vw;
  height: 60vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
	height: 55px;
	display: inline-block;
	border: 3px solid #2F96EF;
	border-radius: 5px;
	padding: 0 15px;
	margin: 10px 0;
	transition: .2s;
	font-size: 30px
}
`;

const Title = styled.h1`
  font-family: 'myriad-pro', myriad, Arial, sans-serif;
`;

const Button = styled.button`
	color: green;
	width: 80%
	height: 40px;
	font-size: 30px;
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = { username: '', pass: '', loggedIn: undefined };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    fetch(
      `${apiUrl()}/login?username=${this.state.username}&pass=${
        this.state.pass
      }`,
      {
        credentials: 'include',
      }
    )
      .then((response) =>
        response.ok
          ? this.setState({ loggedIn: true })
          : this.setState({ loggedIn: false })
      )
      .catch(() => this.setState({ loggedIn: false }));
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  componentDidMount() {
    fetch(`${apiUrl()}/getSession`, { credentials: 'include' })
      .then((response) =>
        response.ok
          ? this.setState({ loggedIn: true })
          : this.setState({ loggedIn: false })
      )
      .catch(() => this.setState({ loggedIn: false }));
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          this.props.children
        ) : this.state.loggedIn !== undefined ? (
          <LoginWrapper>
            <Title> Tapahtuma-apuri admin login </Title>
            <Title> {this.state.loginStatus} </Title>
            <Input
              id="username"
              placeholder="Käyttäjänimi"
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
            />{' '}
            <br />
            <Input
              id="pass"
              placeholder="Salasana"
              type="password"
              onChange={this.handleChange}
              value={this.state.pass}
            />{' '}
            <br />
            <Button onClick={this.login}> Kirjaudu sisään </Button>
          </LoginWrapper>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  children: propTypes.any,
};

export default Login;
