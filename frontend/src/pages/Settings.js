import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import styled from "styled-components";
import UserSettings from '../components/Settings/UserSettings';
import DisplaySettings from '../components/Settings/DisplaySettings';

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
  background: black;
  width: 100%;
  padding: 10vw;
`;

const Title = styled("h1")`
  color: ${props => props.userColor};
`

class Settings extends React.Component {
    render() {
      return (
        <Wrapper>
          <Sidebar />
          <Container>
            <Title userColor={this.props.userColor}>settings</Title>
            <UserSettings />
            <DisplaySettings />
          </Container>
        </Wrapper>
      );
    };
};

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.userId,
    userColor: state.settings.userColor
  });
};

export default connect(mapStateToProps)(Settings);
