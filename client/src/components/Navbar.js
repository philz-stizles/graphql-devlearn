import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ isAuthenticated, onLogout, history }) => {
    return (
        <div className="ui menu">
            <div className="ui container">
                <Link exact="true" to="/" className="item">Devdezyn Hire</Link>
                <Link to="/jobs" className="item">Job Board</Link>
                {
                    (isAuthenticated) && (
                        <Link to="/jobs/new" className="item">Create Job</Link>
                    )
                }
                {
                    (!isAuthenticated) 
                    ? (
                        <div>
                            <button onClick={() => history.push('/login')} className="ui primary button">Sign In</button>
                        </div>
                    )
                    : (
                        <div>
                            <button onClick={onLogout} className="ui primary button">Logout</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

Navbar.prototypes = {
    onLogout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

export default withRouter(Navbar)
