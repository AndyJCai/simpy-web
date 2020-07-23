import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { connect } from 'react-redux';
import { storeSpotifyInfo } from '../actions';
import {apiUrl } from '../Api';

import Sidebar from "../components/Sidebar";
import NewsFeed from "../components/NewsFeed/NewsFeed";
import VibeCheck from "../components/VibeCheck/VibeCheck";

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  background: ${props => props.userColor};
  font-family: Helvetica, sans-serif;
`;

const MainPage = styled("div")`
  color: white;
  display: flex;
  flex-direction: column;
  padding: 10vw;
  width: 100%;
`;

const Sections = styled("div")`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
`;

class Home extends React.Component {
  state = { onFeed: null };

  constructor(props) {
    super(props);
    this.updateSec = this.updateSec.bind(this);
  }

  componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.props.accessToken}` }
    };
    axios.get(`${apiUrl}/users/${this.props.userId}`, config)
      .then((res) => {
        console.log("DATA: " + JSON.stringify(res.data));
        console.log(res.data.userData.profile_pic);
        const profilePic = res.data.userData.profile_pic.length == 0 ? ["https://mpng.subpng.com/20180802/icj/kisspng-user-profile-default-computer-icons-network-video-the-foot-problems-of-the-disinall-foot-care-founde-5b6346121ec769.0929994515332326581261.jpg"] : res.data.userData.profile_pic;
        this.props.storeSpotifyInfo(
          res.data.userData.display_name,
          profilePic,
          res.data.userData.friends,
          res.data.userData.spotify_id,
          res.data.userData.username
        )
      })
  }

  componentWillMount() {
    this.setState({
      onFeed: 1
    });
  }

  SecTitles = styled("h1")`
    color: ${props =>
      this.state.onFeed == props.val ? "var(--primary-white)" : "#676767"};
    cursor: pointer;
    user-select: none;
    transition: 0.2s;
    &:hover {
      color: var(--primary-white);
    }
  `;

  updateSec(event) {
    this.setState({
      onFeed: event.target.dataset.val
    });
    console.log(this.state.onFeed)
  }

  renderContent() {
    if(this.state.onFeed == 0){
      return <VibeCheck />
    }
    return <NewsFeed />
  }

  render() {
    return (
        <Wrapper userColor={this.props.userColor}>
          <Sidebar />
          <MainPage>
            <Sections>
              <this.SecTitles val={0} data-val={0} onClick={this.updateSec}>
                Vibe Check
              </this.SecTitles>
              <this.SecTitles val={1} data-val={1} onClick={this.updateSec}>
                News Feed
              </this.SecTitles>
            </Sections>
            {this.renderContent()}
          </MainPage>
        </Wrapper>

    );
  }
}

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.userId,
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken,
    userColor: state.settings.userColor
  })
}

export default connect(mapStateToProps, { storeSpotifyInfo })(Home);
