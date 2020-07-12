import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
//import ToggleButton from '@material-ui/core/ToggleButton';
//import CheckIcon from '@material-ui/icons/CheckIcon';

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  background: var(--primary-black);
  font-family: Helvetica, sans-serif;
  margin-bottom: 3vw;
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

class UserSettings extends React.Component {
  render() {
    return (
      <Wrapper>
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
      </Wrapper>
    );
  };
};

const mapStateToProps = (state) => {
  return ({ userId: state.auth.userId });
}

export default connect(mapStateToProps)(UserSettings);
