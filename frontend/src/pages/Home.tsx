import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { signIn } from '../actions';
import { connect } from 'react-redux';

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

class Home extends React.Component<{}, { onFeed: number }> {
  constructor(props) {
    super(props);
    this.updateSec = this.updateSec.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:8888/user_spotify_data/lorneez`)
      .then((res) => {
        console.log(res);
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

export default connect(null, { signIn })(Home);
