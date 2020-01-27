import React from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica, sans-serif;
  text-align: center;
`;

const Welcome = styled("p")`
  font-size: 48px;
  font-weight: bold;
  margin: 0px auto;
  width: 70%;
`;

const Desc = styled("p")`
  font-size: 24px;
  width: 70%;
`;

const SpotifyButton = styled("div")`
  border: 0.5px solid black;
  border-radius: 5px;
  font-weight: bold;
  font-size: 24px;
  margin: 50px auto 0px;
  padding: 25px 70px;
`;

export default class Onboard extends React.Component {
  render() {
    return (
      <>
        <Wrapper>
          <Content>
            <Welcome>Welcome to Simpy.</Welcome>
            <Desc>Discover what your friends are listening to.</Desc>
            <SpotifyButton>Sign up with Spotify</SpotifyButton>
          </Content>
        </Wrapper>
      </>
    );
  }
}
