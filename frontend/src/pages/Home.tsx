import React from "react";
import styled from "styled-components";

import Sidebar from "../components/Sidebar";

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

export default class Home extends React.Component<{}, { onFeed: number }> {
  constructor(props) {
    super(props);
    this.updateSec = this.updateSec.bind(this);
  }

  componentWillMount() {
    this.setState({
      onFeed: 1
    });
  }

  SecTitles = styled("p")`
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
                News Feed
              </this.SecTitles>
            </Sections>
          </MainPage>
        </Wrapper>
      </>
    );
  }
}
