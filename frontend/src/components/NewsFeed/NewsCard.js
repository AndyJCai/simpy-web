import React from "react";
import { connect } from "react-redux";
import { getNewsCard } from "../../actions";
import styled from "styled-components";

const Text = styled("p")`
`;

const Title = styled("h3")`
`;

const Row = styled("div")`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
`;

const Column = styled("div")`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`;

const Container = styled("div")`
  margin-top: 5vw;
  color: white;
  display: flex;
  flex-flow: column wrap;
  background: #222222;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  padding-bottom: 2vw;
  padding-top: 2vw;
  padding-left: 3vw;
  padding-right: 3vw;
`;

const ProfilePic = styled("img")`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background: grey;
`;

class NewsCard extends React.Component {
  state = { expand: false };

  toggleExpand = () => {
    this.setState({ expand: !this.state.expand });
  };

  renderSongs = () => {
    return this.props.newsCard.songs.map((song) => {
      return <Text>{song.title}</Text>;
    });
  };

  renderNewsCard = () => {
    if(this.state.expand){
      return (
        <Container>
          <Row>
            {this.props.profilePic.length > 0 ? <ProfilePic src={this.props.profilePic[0]} /> :  <ProfilePic src="" />}
            <Column>
              <Title>{this.props.entry.name}</Title>
              <Text>{this.props.entry.userName}</Text>
            </Column>
            <div></div>
            <button onClick={() => this.toggleExpand()}>Close</button>
          </Row>
          {this.props.newsCard.userName}
          <div>
            <Text>Songs</Text>
            {this.renderSongs()}
          </div>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          {this.props.profilePic.length > 0 ? <ProfilePic src={this.props.profilePic[0]} /> :  <ProfilePic src="" />}
          <Column>
            <Title>{this.props.entry.name}</Title>
            <Text>{this.props.entry.userName}</Text>
          </Column>
          <div></div>
          <button onClick={() => this.toggleExpand()}>Expand</button>
        </Row>
      </Container>
    )

  };

  render() {
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
    profilePic: state.spotify.profilePic,
    newsCard: {
      userName: state.auth.userId + " friend",
      songs: [
        {
          title: "drake - song 1",
        },
        {
          title: "juice wrld - song 2",
        },
        {
          title: "dababy - song 3",
        }
      ]
    }
  };
};

//newsCard: state.newsFeed[ownProps.cardId]

export default connect(mapStateToProps, { getNewsCard })(NewsCard);
