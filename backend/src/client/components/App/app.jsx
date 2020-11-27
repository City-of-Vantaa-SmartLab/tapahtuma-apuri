import React from 'react';
import { hot } from 'react-hot-loader';

import apiUrl from '../../util/apiUrl';
import Login from '../Login/login.jsx';
import DashContainer from '../DashContainer/DashContainer.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = { apiStatus: undefined };
  }

  componentDidMount() {
    fetch(apiUrl())
      .then((response) =>
        response.ok
          ? this.setState({ apiStatus: true })
          : this.setState({ apiStatus: false })
      )
      .catch(() => this.setState({ apiStatus: false }));
  }

  render() {
    return (
      <div>
        <Login>
          <div>
            <DashContainer />
          </div>
        </Login>
      </div>
    );
  }
}

export default hot(module)(App);
