import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { apiUrl } from '../Api';
import { connect } from 'react-redux';
import history from '../history';

const Wrapper = styled("div")`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Content = styled("div")`
  color: white;
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
  border: 2.5px solid white;
  border-radius: 5px;
  font-weight: bold;
  margin: 50px auto 0px;
  padding: 25px 70px;
  color: white;
  cursor: pointer;
  transition: 0.2s;
  @media screen and (max-width: 650px) {
    padding: 20px 55px;
  }
  &:hover {
    color: black;
    background-color: white;
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
position: absolute;
left: 0%;
right: 83.33%;
top: 78.78%;
bottom: 13.22%;

background: #005073;
`

const Color2 = styled("div")`
position: absolute;
left: 16.67%;
right: 66.6%;
top: 78.78%;
bottom: 13.22%;

background: #189AD3;
`

const Color3 = styled("div")`
position: absolute;
left: 33.4%;
right: 49.93%;
top: 78.78%;
bottom: 13.22%;

background: #71C7EC;
`

const Color4 = styled("div")`
position: absolute;
left: 50.07%;
right: 33.19%;
top: 78.78%;
bottom: 13.22%;

background: #B9BFFF;
`

const Color5 = styled("div")`
position: absolute;
left: 66.81%;
right: 16.53%;
top: 78.78%;
bottom: 13.22%;

background: #8B74BD;
`

const Color6 = styled("div")`
position: absolute;
left: 83.47%;
right: -0.21%;
top: 78.78%;
bottom: 13.22%;

background: #7953A9;
`

class Onboard extends React.Component {
  componentDidMount() {
    if(this.props.signedIn){
      window.location.href = `/home/${this.props.userId}`;
    }
  }
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
          <Column>
          <Content>
            <Welcome>Welcome to Simpy.</Welcome>
            <p style={{ width: "70%" }}>
              Discover what your friends are vibing to.
            </p>
            <SpotifyButton onClick={this.spotifyLogin.bind(this)}>
              Sign up with Spotify
            </SpotifyButton>
          </Content>
          <Row>
            <Color1></Color1>
            <Color2></Color2>
            <Color3></Color3>
            <Color4></Color4>
            <Color5></Color5>
            <Color6></Color6>
          </Row>
          </Column>
        </Wrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    signedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  });
}

export default connect(mapStateToProps)(Onboard);
