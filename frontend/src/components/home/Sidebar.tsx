import React from "react";
import styled from "styled-components";

import SettingsCog from "../../resources/settings.svg";

const Wrapper = styled("div")`
  display: flex;
  height: 100vh;
  border-right: 1px black solid;
  justify-content: space-between;
  flex-direction: column;
  position: sticky;
  top: 0px;
  left: 0px;
  font-family: Helvetica, sans-serif;
  font-size: 24px;
`;

const ProfilePic = styled("img")`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  background: grey;
  margin: 60px;
`;

const Prof = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Settings = styled("div")`
  border-top: black solid 1px;
  cursor: pointer;
  display: flex;
  font-size: 20px;
  align-items: center;
`;

const Cog = styled("div")`
  background: url(${SettingsCog});
  background-size: cover;
  width: 20px;
  height: 20px;
  margin: 10px 12px 10px 40px;
`;

export default class Sidebar extends React.Component {
  render() {
    return (
      <>
        <Wrapper>
          <Prof>
            <ProfilePic src="" />
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
