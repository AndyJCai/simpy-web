import React from 'react';

class Error extends React.Component {
  componentDidMount() {
    const params = window.location.pathname.split("/");
    console.log(params)
  }

  render() {
    return (
      <div>
        <h2>An Error Occured</h2>
        <p>error</p>
      </div>
    );
  };
};

export default Error;
