import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

function Main() {

    return (
    <main>
        <Switch>
            <Route exact="exact" path='/' component={HomePage} />
            <Route path='/about' component={AboutPage} />
        </Switch>
    </main>);
}

export default Main;