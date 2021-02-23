import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../utils/auth'
export default class Login extends Component {
    state = {
        loginForm: {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        login(this.state.loginForm).then((loggedInUser) => {
            this.props.onLogin(loggedInUser)
        })
    }

    render() {
        const { email, password } = this.state
        const { isAuthenticated } = this.props

        if(isAuthenticated) return <Redirect to="/" />

        return (
            <div className="ui center aligned middle aligned grid" style={{height: '100vh'}}>
                <div className="column" style={{maxWidth: '450px'}}>
                    <h2 className="ui teal center aligned header">Log-in to your account</h2>
                    <form onSubmit={this.handleSubmit} className="ui large form">
                        <div className="ui stacked segment">

                            <div className="field">
                                <div className="ui fluid left icon input">
                                    <input 
                                        name="email" 
                                        value={email} 
                                        onChange={this.handleChange} placeholder="E-mail address" type="text" />
                                    <i aria-hidden="true" className="user icon"></i>
                                </div>
                            </div>
                            
                            <div className="field">
                                <div className="ui fluid left icon input">
                                    <input 
                                        name="password" 
                                        value={password} 
                                        onChange={this.handleChange} placeholder="Password" type="password" />
                                    <i aria-hidden="true" className="lock icon"></i>
                                </div>
                            </div>
                            
                            <button className="ui teal large fluid button">Login</button>
                        </div>
                    </form>
                    <div className="ui message">New to us? <Link to="/signup">Sign Up</Link></div>
                </div>
            </div>
        )
    }
}
