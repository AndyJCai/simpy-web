import React from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-yellow);
`;

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica, sans-serif;
  text-align: center;
  font-size: 24px;
  @media screen and (max-width: 650px) {
    font-size: 20px;
  }
`;

const Welcome = styled("p")`
  font-size: 48px;
  font-weight: bold;
  margin: 0px auto;
  width: 70%;
  @media screen and (max-width: 650px) {
    font-size: 36px;
  }
`;

const SpotifyButton = styled("div")`
  border: 0.5px solid black;
  border-radius: 5px;
  font-weight: bold;
  margin: 50px auto 0px;
  padding: 25px 70px;
  cursor: pointer;
  @media screen and (max-width: 650px) {
    padding: 20px 55px;
  }
`;

export default class Onboard extends React.Component {
  render() {
    return (
      <>
        <Wrapper>
          <Content>
            <Welcome>Welcome to Simpy.</Welcome>
            <p style={{ width: "70%" }}>
              Discover what your friends are listening to.
            </p>
            <SpotifyButton>Sign up with Spotify</SpotifyButton>
          </Content>
        </Wrapper>
      </>
    );
  }
}
