import React, { Fragment, Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import CompanyDetail from './pages/CompanyDetail'
import Home from './pages/Home'
import JobBoard from './pages/JobBoard'
import JobDetail from './pages/JobDetail'
import JobForm from './pages/JobForm'
import Login from './pages/Login'
import { isLoggedIn, logout } from './utils/auth'

const PrivateRoute = ({component: Component, isAuthenticated, ...rest }) => (
    isAuthenticated ? <Component {...rest} /> : <Redirect to="/login" />
)

class App extends Component {
    state = {
        isAuthenticated: isLoggedIn(),
        loggedInUser: null 
    }

    loginHandler = (loggedInUser) => {
        this.setState({
            isAuthenticated: true,
            loggedInUser 
        })

        this.props.history.push('/jobs')
    }

    logoutHandler = () => {
        logout()
        this.setState({
            isAuthenticated: false,
            loggedInUser: null 
        })
    }

    render() {
        const { isAuthenticated } = this.state
        return (
            <Fragment>
                <Navbar isAuthenticated={isAuthenticated} onLogout={this.logoutHandler}/>
                <div className="ui container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/jobs" component={JobBoard} />
                        <PrivateRoute exact component={JobForm} path="/jobs/new" isAuthenticated={isAuthenticated} />
                        <Route path="/jobs/:id" component={JobDetail} />
                        <Route path="/companies/:id" component={CompanyDetail} />
                        <Route path="/login" render={() => <Login isAuthenticated={isAuthenticated} onLogin={this.loginHandler} />} />
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(App)
