import React from "react";
import { connect } from "react-redux";
import { getNewsFeed } from "../../actions";
import NewsCard from './NewsCard';
import styled from "styled-components";

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  font-family: Helvetica, sans-serif;
`;

const ColumnContainer = styled("div")`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`;


class NewsFeed extends React.Component {
  componentDidMount() {
    //this.props.getNewsFeed(this.props.userId);
  }

  renderNewsFeedCards = () => {
    return this.props.newsFeed.map((entry) => {
      return (
        <div key={entry.userName}>

          <NewsCard entry={entry} cardId={entry.cardId} />
        </div>
      )
    })
  }

  render() {
    console.log(this.props.newsFeed);
    return (
      <Wrapper>
        <ColumnContainer>
          {this.renderNewsFeedCards()}
        </ColumnContainer>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    newsFeed:
      [
        {
          name: "lorne",
          userName: "lorneez",
          cardId: 1
        },
        {
          name: "andy",
          userName: "andycai",
          cardId: 2
        },
        {
          name: "bob",
          userName: "bobsmith",
          cardId: 3
        }
      ]

  };
};

export default connect(mapStateToProps, { getNewsFeed })(NewsFeed);
