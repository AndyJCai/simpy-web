import React from "react";
import { connect } from "react-redux";
import { getNewsFeed } from "../../actions";
import NewsCard from './NewsCard';

class NewsFeed extends React.Component {
  componentDidMount() {
    this.props.getNewsFeed(this.props.userId);
  }

  renderNewsFeedCards = () => {
    return this.props.newsFeed.map((entry) => {
      return (
        <div>
          <img src={entry.imageUrl} />
          <h4>{entry.name}</h4>
          <div>{entry.userName}</div>
          <NewsCard cardId={entry.cardId}/>
        </div>
      )
    })
  }

  render() {
    console.log(this.props.newsFeed);
    return (
      <div>
        {this.renderNewsFeedCards()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    newsFeed: state.newsFeed,
  };
};

export default connect(mapStateToProps, { getNewsFeed })(NewsFeed);
