import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { ContentHeader, ContentTextBold, ContentTextError } from "./Common";
import _ from "lodash";

const LoadingWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const LoadingIcon = styled.div`
  margin-top: 50%;
  font-size: 60px;
`;

class ChecklistGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      error: false,
      answers: [],
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem("answers")) {
      // Make sure that the private state is passed with the list of answers
      // Bool isPrivate is added to the list of answers
      let answers = JSON.parse(localStorage.getItem("answers"));
      const answerPrivate = {
        ..._.head(answers),
        isPrivate: this.props.location.state.isPrivate,
      };
      answers[0] = answerPrivate;

      fetch(`${process.env.REACT_APP_API_URL}/api/createMemo`, {
        method: "POST",
        body: JSON.stringify({ answers }),
      })
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            finished: true,
            memo_id: response[0].id,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: true });
        });
    }
  }

  renderStatus(err) {
    if (err) {
      return (
        <LoadingWrapper>
          <ContentTextError>
            Muistilistaa tallentaessa tapahtui virhe, olkaa hyvä ja kokeilkaa
            myöhemmin uudelleen.
          </ContentTextError>
        </LoadingWrapper>
      );
    } else {
      return (
        <LoadingWrapper>
          <ContentTextBold>
            Tallennetaan muistilistaa, olkaa hyvä ja odottakaa
          </ContentTextBold>
          <LoadingIcon className="fa fa-spinner fa-spin" />
        </LoadingWrapper>
      );
    }
  }

  render() {
    if (this.state.finished) {
      return (
        <Redirect
          push
          to={{
            pathname: `/muistilista/${this.state.memo_id}`,
          }}
        />
      );
    } else {
      return (
        <div className="Container">
          <ContentHeader />
          {this.renderStatus(this.state.error)}
        </div>
      );
    }
  }
}

export default ChecklistGenerator;
