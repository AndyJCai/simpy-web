import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import BubbleChart from '@weknow/react-bubble-chart-d3';

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

class FriendGraph extends React.Component {
  componentDidMount() {
    console.log(window.screen)
  }

  bubbleClick = (label) =>{
    console.log("Custom bubble click func")
  }

  legendClick = (label) =>{
    console.log("Customer legend click func")
  }

  renderBubbleGraph = () => {
    return (
      <BubbleChart
        graph= {{
          zoom: 1.0,
        }}
        width={400}
        height={400}
        padding={0}
        showLegend={true}
        legendPercentage={20}
        legendFont={{
          family: 'Arial',
          size: 12,
          color: '#000',
          weight: 'bold',
        }}
        valueFont={{
          family: 'Arial',
          size: 12,
          color: '#fff',
          weight: 'bold',
        }}
        labelFont={{
          family: 'Arial',
          size: 16,
          color: '#fff',
          weight: 'bold',
        }}
        bubbleClickFunc={this.bubbleClick}
        legendClickFun={this.legendClick}
        data={[
          { label: 'Lorne', value: 1 },
          { label: 'Lorne', value: 4 },
          { label: 'Lorne', value: 3 },
          { label: 'Lorne', value: 6 },
          { label: 'Lorne', value: 8 },
          { label: 'Lorne', value: 19 },
          { label: 'Lorne', value: 2 },
          { label: 'Lorne', value: 4 },
          { label: 'Lorne', value: 5 },
          { label: 'Lorne', value: 1 },
        ]}
      />
    )
  }
  render() {
    return (
      <Wrapper>
        <ColumnContainer>
          <div>Friend Graph!</div>
          {this.renderBubbleGraph()}
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

export default connect(mapStateToProps)(FriendGraph);
