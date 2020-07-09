import React from "react";
import { connect } from "react-redux";
import { getNewsCard } from "../../actions";

class NewsCard extends React.Component {
  state = { expand: false };

  componentDidMount() {
    this.props.getNewsCard(this.props.cardId);
  };

  toggleExpand = () => {
    this.setState({ expand: !this.state.expand });
  };

  renderSongs = () => {
    return this.props.newsCard.songs.map((song) => {
      <div>{song.title}</div>
    });
  };

  renderNewsCard = () => {
    if(this.state.expand){
      return (
        <div>
          <button onClick={this.toggleExpand()}>Close</button>
          {this.props.userId}
          {this.props.newsCard.userName}
          <div>
            <div>Songs</div>
            {this.renderSongs()}
          </div>
        </div>
      );
    ) else {
      return (
        <div>
          <button onClick={this.toggleExpand()}>Expand</button>
        </div>
      )
    }
  };

  render() {
    console.log(this.props.newsCard);
    return (
      <div>
        {this.renderNewsCard()}
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth.userId,
    newsCard: state.newsFeed[ownProps.cardId]
  };
};

export default connect(mapStateToProps, { getNewsCard })(NewsCard);
