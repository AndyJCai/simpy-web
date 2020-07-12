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
  background: var(--primary-black);
  font-family: Helvetica, sans-serif;
`;

const MainPage = styled("div")`
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
        this.props.storeSpotifyInfo(res.data.userData.display_name, res.data.userData.profile_pic, res.data.userData.friends, res.data.userData.spotify_id)
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
                <NewsFeed />
              </this.SecTitles>
            </Sections>
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
