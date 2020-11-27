import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";
import {
  ContentHeader,
  ContentWrapper,
  ContentTitle,
  ContentText,
  ContentTextBold,
  Divider,
  MemoArrowContainer,
  MemoItem,
  StartBtn,
} from "./Common";

const MemoLink = styled.div`
  margin-top: 5px;
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: bold;
  line-height: 17px;
  text-align: left;
`;

const MemoIcon = styled.div`
  color: #3c8fde;
  margin-left: 5px;
`;

const InfoLink = styled.a`
  opacity: 0.86;
  color: #000000;
  font-family: "Open Sans";
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
`;

const BtnTxt = styled.div`
  color: #ffffff;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1.14px;
  text-align: center;
`;

const Aux = (props) => props.children;

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      info: {},
      isPrivate: false,
    };
  }

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/getMemo?id=${this.props.match.params.memoId}`
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState((state) => {
          state.answers = _.head(response).memodata;
          state.isPrivate = _.head(_.head(response).memodata).isPrivate;
          return state;
        });
      })
      .catch((err) => console.log(err));
    fetch(`${process.env.REACT_APP_API_URL}/api/getInfo`)
      .then((info) => info.json())
      .then((info) => {
        this.setState((state) => {
          state.info = info;
          return state;
        });
      });
  }

  renderAdditionalInfos = (additional_infos) => {
    const info_links_n_titles = _.partition(
      additional_infos,
      (n) => _.indexOf(additional_infos, n) % 2
    );
    return _.zipWith(
      info_links_n_titles[0],
      info_links_n_titles[1],
      function (link, title) {
        return (
          <Aux>
            <InfoLink href={link} target="_blank" key={title}>
              {title}
            </InfoLink>
            <br />
          </Aux>
        );
      }
    );
  };

  renderMemo = (memo, question_info) => (
    <AccordionItem key={memo.id}>
      <Aux>
        <AccordionItemTitle key={memo.text}>
          <ContentText>
            <MemoItem>
              <div>{memo.text}</div>
              <MemoArrowContainer>
                <div className="accordion_icon fa" role="presentation" />
              </MemoArrowContainer>
              {memo.link && (
                <MemoLink>
                  <a href={memo.link} target="_blank">
                    LOMAKE
                  </a>
                  <MemoIcon className="fa fa-external-link" />
                </MemoLink>
              )}
            </MemoItem>
          </ContentText>
        </AccordionItemTitle>
        <AccordionItemBody>
          <ContentWrapper>
            <ContentTextBold>Lisätiedot</ContentTextBold>
            {this.renderAdditionalInfos(memo.additional_infos)}
            <ContentWrapper>
              <Divider />
            </ContentWrapper>
          </ContentWrapper>
        </AccordionItemBody>
        <AccordionItemBody>
          <ContentWrapper>
            <ContentText>{question_info}</ContentText>
          </ContentWrapper>
        </AccordionItemBody>
      </Aux>
    </AccordionItem>
  );

  renderMemos = (answers) =>
    _.map(answers, (answer) =>
      _.zipWith(
        answer.memo_links,
        answer.memo_titles,
        (memo_link, memo_title) =>
          this.renderMemo(
            memo_link,
            memo_title,
            answer.info_links,
            answer.info_titles,
            answer.question_info
          )
      )
    );

  render(props) {
    return (
      <div className="Container">
        <ContentHeader />
        <Aux>
          {!_.isEmpty(this.state.info) && (
            <ContentWrapper style={{ marginBottom: "30px" }}>
              <ContentTitle>
                {this.state.isPrivate
                  ? this.state.info.privateGreetingHeader
                  : _.isEmpty(this.state.answers)
                  ? this.state.info.emptyGreetingHeader
                  : this.state.info.readyGreetingHeader}
              </ContentTitle>
              <ContentText>
                {this.state.isPrivate
                  ? this.state.info.privateGreetingBody
                  : _.isEmpty(this.state.answers)
                  ? this.state.info.emptyGreetingBody
                  : this.state.info.readyGreetingBody}
              </ContentText>
              {_.isEmpty(this.state.answers) && (
                <StartBtn>
                  <Link style={{ textDecoration: "none" }} to="/kysely">
                    <BtnTxt>ALOITA UUSI KYSELY</BtnTxt>
                  </Link>
                </StartBtn>
              )}
            </ContentWrapper>
          )}
          {!_.isEmpty(this.state.answers) &&
            this.state.answers.map((answer, index) => (
              <Aux key={index}>
                <Accordion>
                  {answer.memos.map((memos) =>
                    this.renderMemo(memos, answer.question_info)
                  )}
                </Accordion>
              </Aux>
            ))}
        </Aux>
      </div>
    );
  }
}

export default Checklist;
