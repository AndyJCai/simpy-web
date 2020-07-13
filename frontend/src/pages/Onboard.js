import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { apiUrl } from '../Api';

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
  text-decoration: none;
  border: 2.5px solid black;
  border-radius: 5px;
  font-weight: bold;
  margin: 50px auto 0px;
  padding: 25px 70px;
  color: black;
  cursor: pointer;
  transition: 0.2s;
  @media screen and (max-width: 650px) {
    padding: 20px 55px;
  }
  &:hover {
    color: var(--primary-yellow);
    background-color: black;
  }
`;

const Text = styled("p")`
`;

const Title = styled("h3")`
`;

const Row = styled("div")`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
`;

const Column = styled("div")`
  width: 50%;
  display: flex;
  flex-flow: column wrap;
`;

const Color1 = styled("div")`
  margin-top: .5vw;
  width: 16%;
  height: 2vw;
  background: #005073;
`

const Color2 = styled("div")`
  margin-top: .5vw;
  width: 16%;
  height: 2vw;
  background: #189AD3;
`

const Color3 = styled("div")`
  margin-top: .5vw;
  width: 16%;
  height: 2vw;
  background: #71C7EC;
`

const Color4 = styled("div")`
  margin-top: .5vw;
  width: 16%;
  height: 2vw;
  background: #B9BFFF;
`

const Color5 = styled("div")`
  margin-top: .5vw;
  width: 16%;
  height: 2vw;
  background: #8B74BD;
`

const Color6 = styled("div")`
  margin-top: .5vw;
  width: 16%;
  height: 2vw;
  background: #7953A9;
`

export default class Onboard extends React.Component<RouteComponentProps> {
  // refresh page for redirect to spotify
  spotifyLogin() {
    // this.props.history.push({
    //   pathname: `${apiUrl}/login`
    // })
    //fetch("http://localhost:8888/login").then((res) => {
    //  window.location.href = `http://localhost:3000/home/${res["userId"]}`;
    //})
    window.location.href = `${apiUrl}/login`;
  }

  render() {
    return (
      <>
        <Wrapper>
          <Content>
            <Welcome>Welcome to Simpy.</Welcome>
            <p style={{ width: "70%" }}>
              Discover what your friends are listening to.
            </p>
            <SpotifyButton onClick={this.spotifyLogin.bind(this)}>
              Sign up with Spotify
            </SpotifyButton>
            <Row>
              <Color1></Color1>
              <Color2></Color2>
              <Color3></Color3>
              <Color4></Color4>
              <Color5></Color5>
              <Color6></Color6>
            </Row>
          </Content>
        </Wrapper>
      </>
    );
  }
}
