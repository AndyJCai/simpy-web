import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as d3 from "d3";

import friendCSV from "./friends.csv";

class BubbleChart extends React.Component {
  constructor(props){
    super(props);

    this.renderChart = this.renderChart.bind(this);
  };

  componentDidMount() {
    this.svg = ReactDOM.findDOMNode(this);
    this.renderChart();
    console.log(this.props.friendImage)
  };

  renderChart() {
    // Define the width and height of the svg.
    var width = 500, height = 500;

    // Set up svg by adding a g element that groups all svg shapes together.
    var svg = d3.select(this.svg)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Set up defs.
    var defs = svg.append("defs");

    // Pattern describes the background color or image.
    // defs.append("pattern")
    //   .attr("id", "friendImage")
    //   .attr("height", "100%")
    //   .attr("width", "100%")
    //   .attr("patternContentUnits", "objectBoundingBox")
    //   .append("image")
    //   .attr("height", 1)
    //   .attr("width", 1)
    //   .attr("preserveAspectRatio", "none")
    //   .attr("xlink:href", this.props.friendImage)

    // To allow the circles to have variable size, we define a square root
    // scale.
    // Domain is input, range is output.
    var radiusScale = d3.scaleSqrt().domain([2, 20]).range([10, 80]);

    // Create force simulation that defines how our circles interact and go.
    // 1. Make the circles go to the center:
    // Forces move the data towards a point and the strength defines how fast.
    // Width / 2 and height / 2 make the cirlces migrate towards the center.
    // 2. Prevent the circles from colliding:
    // Force colide defines a radius for each circle to prevent collision.
    var simulation = d3.forceSimulation()
      .force("x", d3.forceX(0).strength(0.01))
      .force("y", d3.forceY(0).strength(0.01))
      .force("collide", d3.forceCollide(function(d) {
        return radiusScale(d.songs) + 2;
      }));

    // Import friend data.
    const friends = d3.csv(friendCSV).then(function(data) {
      ready(data);
    });

    const tempImage = this.props.friendImage;

    // Add a circle for each friend and add it to the simulation.
    function ready (data) {
      var circles = svg.selectAll(".friend")
        .data(data)
        .enter().append("circle")
        .attr("class", "friend")
        .attr("r", function(d) {
          return radiusScale(d.songs);
        })
        .attr("fill", "lightblue")
        .attr("fill", function(d) {
          return "url(#" + d.name + ")";
        })
        .attr("stroke","black");

      // Unique pattern for each bubble.
      defs.selectAll(".friend-pattern")
        .data(data)
        .enter().append("pattern")
        .attr("class", "friend-pattern")
        .attr("id", function(d) {
          return d.name;
        })
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", tempImage)

      // Add a function to define how the circle behaves each tick.
      simulation.nodes(data)
        .on("tick", ticked);

      function ticked() {
        circles
          .attr("cx", function(d) {
            // Automatically update circle x coordinate.
            return d.x;
          })
          .attr("cy", function(d) {
            // Automatically update circle y coordinate.
            return d.y;
          });
      };
    };
  };

  render() {
    return (
      <svg width={500} height={500} />
    );
  };
};

const mapStateToProps = (state) => {
  return({
    friendImage: state.spotify.profilePic[0]
  })
}

export default connect(mapStateToProps)(BubbleChart);
