import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { changeColor } from '../../actions';
import {apiUrl } from '../../Api';
import axios from 'axios';

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  background: var(--primary-black);
  font-family: Helvetica, sans-serif;
`;

const Container = styled("div")`
  color: white;
  display: flex;
  flex-flow: column wrap;
  background: #222222;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  padding-bottom: 2vw;
  padding-top: 2vw;
  padding-left: 3vw;
  padding-right: 3vw;
  margin-top: 5vw;
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
const ColumnContainer = styled("div")`
  width: 100%;
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

const colorBank = {
  color1: "#005073",
  color2: "#189AD3",
  color3: "#71C7EC",
  color4: "#B9BFFF",
  color5: "#8B74BD",
  color6: "#7953A9"
}

class DisplaySettings extends React.Component {
  onColorChange = (color) => {
    this.props.changeColor(color);
    console.log(this.props.accessToken)
    const config = {
      headers: { Authorization: `Bearer ${this.props.accessToken}` },
    };
    const body = {
        displayName: this.props.displayName,
        colorSetting: this.props.colorSetting,
        username: this.props.username
    }

    axios.post(`${apiUrl}/users/${this.props.userId}`, body, config)
      .then((res) => {
        console.log(body);
        console.log("DATA: " + JSON.stringify(res.data));
      })
  }

  render() {
    return (
      <Wrapper>
        <ColumnContainer>
          <Container>
            <Title>user settings</Title>
            <Row>
              <Column>
                <Text>username:</Text>
                <Text>spotify account:</Text>
                <Text>private mode:</Text>
              </Column>
              <Column>
                <Text>@username</Text>
                <Text>@spotify-username</Text>
                <Text>button</Text>
              </Column>
            </Row>
          </Container>
          <Container>
            <Title>display settings</Title>
            <Row>
              <Column>
                <Text>display name:</Text>
                <Text>your mood:</Text>
              </Column>
              <Column>
                <Text>@username</Text>
              </Column>
            </Row>
            <Row>
              <Color1 onClick={() => this.onColorChange(colorBank.color1)}></Color1>
              <Color2 onClick={() => this.onColorChange(colorBank.color2)}></Color2>
              <Color3 onClick={() => this.onColorChange(colorBank.color3)}></Color3>
              <Color4 onClick={() => this.onColorChange(colorBank.color4)}></Color4>
              <Color5 onClick={() => this.onColorChange(colorBank.color5)}></Color5>
              <Color6 onClick={() => this.onColorChange(colorBank.color6)}></Color6>
            </Row>
          </Container>
        </ColumnContainer>
      </Wrapper>
    );
  };
};

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.userId,
    accessToken: state.auth.accessToken,
    displayName: state.spotify.displayName,
    colorSetting: state.settings.userColor,
    username: state.spotify.username
  });
}

export default connect(mapStateToProps, { changeColor })(DisplaySettings);
