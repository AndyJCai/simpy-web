import React from "react";
import styled from "styled-components";

import Sidebar from "../components/home/Sidebar";

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
`;

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Wrapper>
          <Sidebar />
          <div style={{ height: "300vh" }}></div>
        </Wrapper>
      </>
    );
  }
}
