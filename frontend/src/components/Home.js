import logo from "../logo.png";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StartBtn } from "./Common";

const HomeTitle = styled.div`
  font-family: "GT-Walsheim";
  font-size: 36px;
  font-weight: 900;
  line-height: 49px;
  margin-top: 60px;
  margin-bottom: 0px;
  width: 100%;
  text-align: left;
`;

const InfoTxt = styled.div`
  color: white;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-top: 40px;
  text-align: left;
`;

const BtnTxt = styled.div`
  color: #ffffff;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1.14px;
`;

const AppLogo = styled.img`
  margin: 25px 0;
  max-width: 70px;
  max-height: 70px;
`;

const FullWidth = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <div className="Container Home">
      <FullWidth>
        <HomeTitle>Tapahtuma-apuri</HomeTitle>
        <InfoTxt>
          Suunnitteletko tapahtuman järjestämistä? Olipa suunnitelmissasi
          katufestivaali, markkinat tai urheiluturnaus, Tapahtuma-apurilla voit
          luoda kätevän muistilistan tapahtumatuotantosi tueksi. Tapahtumallesi
          räätälöity muistilista sisältää linkkejä ohjeisiin ja lomakkeisiin,
          joita tarvitset.
          <br />
          <br />
          <br />
          Jos haluat tallentaa vastauksista syntyvän muistilistan, käytäthän
          sovellusta selaimella. Mobiilikäyttöisen sovellusversion muistilistan
          tallennus on tulossa.
        </InfoTxt>
        <StartBtn>
          <Link style={{ textDecoration: "none" }} to="/kysely">
            <BtnTxt>ALOITA KYSELY</BtnTxt>
          </Link>
        </StartBtn>
      </FullWidth>
      <AppLogo src={logo} alt="logo" />
    </div>
  );
};

export default Home;
