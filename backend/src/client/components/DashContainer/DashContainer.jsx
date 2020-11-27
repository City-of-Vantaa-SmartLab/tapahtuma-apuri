import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/Header.jsx';
import QuestionList from '../QuestionList/QuestionList.jsx';
import QuestionEditor from '../QuestionEditor/QuestionEditor.jsx';
import InfoEditor from '../InfoEditor/InfoEditor.jsx';

const DashWrapper = styled.div`
  width: 60vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const DashContainer = () => (
  <DashWrapper>
    <Header />
    <Switch>
      <Route exact path="/" component={QuestionList} />
      <Route path="/newQuestion" component={QuestionEditor} />
      <Route path="/editQuestion/:id" component={QuestionEditor} />
      <Route path="/editInfos" component={InfoEditor} />
    </Switch>
  </DashWrapper>
);

export default DashContainer;
