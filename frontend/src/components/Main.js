import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

function Main() {

    return (
    <main>
        <Switch>
            <Route exact="exact" path='/' component={} />
            <Route path='/about' component={} />
        </Switch>
    </main>);
}

export default Main;