import React, { Component } from 'react'

export default class MessageForm extends Component {
    state = {
        text: ''
    }

    render() {
        const { text } = this.state
        return (
            <form className="ui reply form">
                <div className="field">
                    <textarea onChange={(e) => this.setState({text: e.target.value})} rows="3"></textarea>
                </div>
                <button type="button" onClick={() => this.props.onCreateMessage(text)} className="ui icon primary left labeled button">
                    <i aria-hidden="true" className="edit icon"></i>Add Reply
                </button>
            </form>
        )
    }
}
