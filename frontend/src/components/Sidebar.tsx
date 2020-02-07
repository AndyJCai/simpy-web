import React from "react";
import styled from "styled-components";

import SettingsCog from "../resources/settings.svg";

const Wrapper = styled("div")`
  display: flex;
  height: 100vh;
  border-right: 1px solid var(--primary-white);
  justify-content: space-between;
  flex-direction: column;
  position: sticky;
  top: 0px;
  left: 0px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
`;

const ProfilePic = styled("img")`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  background: grey;
  margin: 50px;
  margin-bottom: 0px;
  @media screen and (max-width: 1000px) {
    width: 110px;
    height: 110px;
    margin: 30px;
    margin-bottom: 0px;
  }
  @media screen and (max-width: 700px) {
    width: 90px;
    height: 90px;
    margin: 20px;
    margin-bottom: 0px;
  }
`;

const Prof = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--primary-white);
`;

const Settings = styled("div")`
  border-top: var(--primary-white) solid 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--primary-white);
  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
`;

const Cog = styled("div")`
  background: url(${SettingsCog});
  background-size: cover;
  width: 20px;
  height: 20px;
  margin: 10px 12px 10px 40px;
  @media screen and (max-width: 1000px) {
    width: 15px;
    height: 15px;
    margin-left: 0px;
  }
  @media screen and (max-width: 700px) {
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 9px;
    width: 12px;
    height: 12px;
  }
`;

const Name = styled("p")`
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0px;
  width: 80%;
  @media screen and (max-width: 1000px) {
    font-size: 26px;
  }
  @media screen and (max-width: 700px) {
    font-size: 20px;
  }
`;

const Handle = styled("p")`
  text-align: center;
  margin-top: 10px;
  width: 90%;
`;

const Friends = styled("div")`
  width: 70%;
  text-align: center;
  border: 0.5px var(--primary-white) solid;
  border-radius: 5px;
  padding: 10px;
  transition: 0.1s;
  @media screen and (max-width: 700px) {
    padding: 7px;
  }
  &:hover {
    box-shadow: 0px 0px 10px white;
  }
`;

export default class Sidebar extends React.Component {
  render() {
    return (
      <>
        <Wrapper>
          <Prof>
            <ProfilePic src="" />
            <Name>Henry</Name>
            <Handle>@username</Handle>
            <Friends>100 Friends</Friends>
          </Prof>
          <Settings>
            <Cog />
            Settings
          </Settings>
        </Wrapper>
      </>
    );
  }
}
