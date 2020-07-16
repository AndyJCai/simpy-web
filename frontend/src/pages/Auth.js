import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import history from '../history';

class Auth extends React.Component {
  componentDidMount() {
    const params = window.location.pathname.split("/");
    const accessToken = params[2];
    const refreshToken = params[3];
    const userId = params[4];
    const expiresIn = params[5];
    const timeStamp = new Date().getTime();
    this.props.signIn(userId, accessToken, refreshToken, expiresIn, timeStamp);
    history.push(`/home/${userId}`);
  }

  render() {
    return (
        <div>
          auth
        </div>
    );
  };
};

export default connect(null, { signIn })(Auth);
