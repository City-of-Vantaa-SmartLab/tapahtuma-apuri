import React from "react";
import styled from "styled-components";

const ContentHeader = () => (
  <Banner>
    <Title>TAPAHTUMA-APURI</Title>
  </Banner>
);

const Banner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 25px 20px 25px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;

  @media only screen and (min-width: 600px) {
    border-radius: 15px 15px 0px 0px;
  }
`;

const Title = styled.div`
  color: #3c8fde;
  font-family: "Open Sans";
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  text-align: left;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: left;
`;

const ContentTitle = styled.div`
  opacity: 0.86;
  color: #000000;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
  float: left;
  width: 100%;
  margin-bottom: 0.5em;
`;

const ContentText = styled.div`
  line-height: 22px;
  font-size: 16px;
  font-family: "Open Sans";
  color: #000000;
  opacity: 0.86;
  text-align: left;
`;

const ContentTextBold = styled.div`
  color: #000000;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: bold;
`;

const ContentTextError = styled.div`
  color: red;
  font-family: "Open Sans";
  font-size: 16px;
`;

const Divider = styled.div`
  background-color: #3c8fde;
  border-radius: 5px;
  width: 60px;
  height: 3px;
  margin-bottom: 30px;
`;

const MemoArrowContainer = styled.div`
  align-items: center;
  display: flex;
  grid-column: 2;
  grid-row: 1 / span 3;
  justify-content: center;
`;

const MemoItem = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: auto 20px;
  grid-template-rows: auto auto;
  width: 100%;
`;

const StartBtn = styled.div`
  background-color: #3f92cf;
  border: 2px solid #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  margin-top: 60px;
  padding: 20px;
  width: 100%;
`;

export {
  ContentHeader,
  ContentWrapper,
  ContentTitle,
  ContentText,
  ContentTextBold,
  ContentTextError,
  Divider,
  MemoArrowContainer,
  MemoItem,
  StartBtn,
};
