import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import SettingsCog from "../resources/settings.svg";
import { signOut, clearSettings, clearSpotifyInfo } from "../actions";
const Wrapper = styled("div")`

  background: ${props => props.userColor};
  display: flex;
  height: 100vh;
  border-right: 1px solid white;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
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
  margin-right: 10px;
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

const ButtonText = styled("div")`
  color: white;
`;

const Name = styled("p")`
  color: white;
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
  color: white;
  text-align: center;
  margin-top: 10px;
  width: 90%;
`;

const Friends = styled("div")`
  color: white;
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

class Sidebar extends React.Component {
  handleLogout() {
    this.props.clearSettings();
    this.props.clearSpotifyInfo();
    this.props.signOut();
  }

  render() {
    return (
      <>
        <Wrapper userColor={this.props.userColor}>
          <Prof>
            {this.props.profilePic.length > 0 ? <ProfilePic src={this.props.profilePic[0]} /> :  <ProfilePic src="" />}
            <Name>{this.props.displayName}</Name>
            <Handle>@{this.props.spotifyId}</Handle>
            <Friends>{this.props.friends} Friends</Friends>
          </Prof>
          <Settings>
            <Button variant="outline" color="default" href={`/settings/${this.props.userId}`}>
              <Cog />
              <ButtonText>
                Settings
              </ButtonText>
            </Button>
            <Button variant="outline" color="default" href={`/home/${this.props.userId}`}>
              <ButtonText>
                Home
              </ButtonText>
            </Button>
            <Button variant="outline" color="default" onClick={() => this.handleLogout()}>
              <ButtonText>
                Logout
              </ButtonText>
            </Button>
          </Settings>
        </Wrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.userId,
    displayName: state.spotify.displayName,
    spotifyId: state.spotify.spotifyId,
    friends: state.spotify.friends.length,
    profilePic: state.spotify.profilePic,
    userColor: state.settings.userColor
  });
};

export default connect(mapStateToProps, { signOut, clearSettings, clearSpotifyInfo })(Sidebar);
