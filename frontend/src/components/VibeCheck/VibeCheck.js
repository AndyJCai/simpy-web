import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import FriendGraph from './FriendGraph';

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  background: var(--primary-black);
  font-family: Helvetica, sans-serif;
`;

const ColumnContainer = styled("div")`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`;

class VibeCheck extends React.Component {
  render() {
    return (
      <Wrapper>
        <ColumnContainer>
          <div>Vibe Check</div>
          <FriendGraph />
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

export default connect(mapStateToProps)(VibeCheck);
