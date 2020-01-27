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
  font-size: 20px;
`;

const ProfilePic = styled("img")`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  background: grey;
  margin: 60px;
  margin-bottom: 0px;
`;

const Prof = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Settings = styled("div")`
  border-top: black solid 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Cog = styled("div")`
  background: url(${SettingsCog});
  background-size: cover;
  width: 20px;
  height: 20px;
  margin: 10px 12px 10px 40px;
`;

const Name = styled("p")`
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0px;
`;

const Handle = styled("p")`
  text-align: center;
  margin-top: 10px;
`;

const Friends = styled("div")`
  width: 70%;
  text-align: center;
  border: 0.5px black solid;
  border-radius: 5px;
  padding: 10px;
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
