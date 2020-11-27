import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  ContentHeader,
  ContentWrapper,
  ContentTitle,
  ContentText,
  Divider,
} from "./Common";
import convertIdtoSem from "../util/convertIdtoSem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const KysymysNro = styled.div`
  font-family: "Open Sans";
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  opacity: 0.5;
  margin-bottom: 4px;
`;

const AnswerOption = styled.div`
  background-color: #ffffff;
  color: #000000;
  opacity: 0.86;
  font-family: "Open Sans";
  font-size: 18px;
  line-height: 24px;
  text-align: left;
  border-bottom: 1px solid #c8c8c8;
`;

const BackLink = styled.a`
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 12px;
  color: #3c8fde;
  letter-spacing: 0;
  margin-top: 30px;
  margin-bottom: 30px;
`;

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      questions: [],
      current_question: {
        question_ordinal_first: "",
        options: [],
      },
      answers: [],
      finished: false,
      isPrivate: false,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/getQuestions`)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          questions: response,
          current_question: _.head(response),
          finished: false,
        })
      )
      .catch((err) => console.log(err));
  }

  storeAnswers() {
    localStorage.setItem("answers", JSON.stringify(this.state.answers));
  }

  handleAnswer(option_id, info) {
    const option = _.head(
      _.filter(this.state.current_question.options, ["id", option_id])
    );
    this.setState({ history: this.state.history.concat(option) });
    if (option.memos.length > 0) {
      this.setState({
        answers: this.state.answers.concat({
          memos: option.memos,
          question_info: info,
        }),
      });
    }
    // Behaviour if the question triggers a private checklist
    if (option.forward_to === -1) {
      this.setState({ isPrivate: true, finished: true });
    }
    if (option.forward_to === null) {
      this.setState({ finished: true });
    } else {
      const next_question = _.head(
        _.filter(this.state.questions, ["id", option.forward_to])
      );
      this.setState({
        current_question: next_question,
      });
    }
  }

  onBackClick() {
    // If the last option selected exists and involved a record of an answer, remove it and rewind the history
    const lastOptionSelected = _.last(this.state.history);

    if (lastOptionSelected !== undefined) {
      const lastQuestion = _.head(
        _.filter(this.state.questions, ["id", lastOptionSelected.question_id])
      );

      if (lastOptionSelected !== undefined)
        this.setState({ current_question: lastQuestion });

      if (this.state.history.length > 0) {
        // Rewind history
        this.setState({
          history: _.take(this.state.history, this.state.history.length - 1),
        });
        // Remove the answer record
        if (lastOptionSelected.memos.length > 0) {
          this.setState({
            answers: _.take(this.state.answers, this.state.answers.length - 1),
          });
        }
      }
    }
  }

  renderOptions(options, info) {
    if (options !== null) {
      return (
        <form className="Answers-body">
          {options.map((option) => (
            <AnswerOption key={option.id}>
              <input
                name="answer"
                type="radio"
                id={option.id}
                onClick={this.handleAnswer.bind(this, option.id, info)}
              />
              <label htmlFor={option.id}>{option.text}</label>
            </AnswerOption>
          ))}
        </form>
      );
    }
  }

  render() {
    if (this.state.finished) {
      this.storeAnswers();
      return (
        <Redirect
          push
          to={{
            pathname: "/muistilista",
            state: { isPrivate: this.state.isPrivate },
          }}
        />
      );
    }

    return (
      <div className="Container">
        <ContentHeader />
        <ContentWrapper>
          {this.state.history.length > 0 && (
            <div>
              <BackLink onClick={this.onBackClick}>
                {" "}
                <FontAwesomeIcon icon={faChevronLeft} /> Takaisin edelliseen
              </BackLink>
            </div>
          )}
          <KysymysNro>
            {"Kysymys " +
              convertIdtoSem(
                this.state.current_question.question_ordinal_first,
                this.state.current_question.question_ordinal_second,
                this.state.current_question.question_ordinal_third
              )}
          </KysymysNro>
          <ContentTitle>{this.state.current_question.title}</ContentTitle>
        </ContentWrapper>
        {this.renderOptions(
          this.state.current_question.options,
          this.state.current_question.info
        )}
        <ContentWrapper>
          <Divider />
          <ContentText>{this.state.current_question.info}</ContentText>
        </ContentWrapper>
      </div>
    );
  }
}

export default Questionnaire;
