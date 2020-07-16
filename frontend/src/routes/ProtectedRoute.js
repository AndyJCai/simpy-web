import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = this.props.signedIn

        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect exact to={{ pathname: '/' }} />
        );
    }
}

const mapStateToProps = (state) => {
    return ({
      signedIn: state.auth.isSignedIn
    })
}

export default connect(mapStateToProps)(ProtectedRoute);
