import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { connect } from 'react-redux';
import { storeSpotifyInfo } from '../actions';
import {apiUrl } from '../Api';

import Sidebar from "../components/Sidebar";
import NewsFeed from "../components/NewsFeed/NewsFeed";

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  background: black;
  font-family: Helvetica, sans-serif;
`;

const MainPage = styled("div")`
  color: white;
  display: flex;
  flex-direction: column;
  margin-left: 150px;
`;

const Sections = styled("div")`
  display: flex;
  flex-direction: row-reverse;
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
        const profilePic = res.data.userData.profile_pic.length == 0 ? ["data:image/png;base64,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"] : res.data.userData.profile_pic;
        this.props.storeSpotifyInfo(
          res.data.userData.display_name,
          profilePic,
          res.data.userData.friends,
          res.data.userData.spotify_id)
      })
  }

  componentWillMount() {
    this.setState({
      onFeed: 1
    });
  }

  SecTitles = styled("div")`
    color: ${props =>
      this.state.onFeed == props.val ? "var(--primary-white)" : "#676767"};
    font-size: 64px;
    cursor: pointer;
    user-select: none;
    transition: 0.2s;
    margin-right: 100px;
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
      return <div>Vibe Check</div>
    }
    return <NewsFeed />
  }

  render() {
    return (
      <>
        <Wrapper>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.userId,
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken
  })
}

export default connect(mapStateToProps, { storeSpotifyInfo })(Home);
