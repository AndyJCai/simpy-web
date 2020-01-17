import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import FeedPost from './FeedPost';
import ProfileBar from './ProfileBar';

function Routes() {

    return (
            <Router>
                <Switch>
                    <Route exact="exact" path='/' component={FeedPost} />
                    <Route path='/about' component={ProfileBar} />
                </Switch>
            </Router>
    );
}

export default Routes;