import React, { Component } from 'react'
import MessageForm from '../components/messages/MessageForm';
import MessageList from '../components/messages/MessageList';
import { loadMessages, createMessage, onMessageAdded } from '../graphql/chatService';

export default class Chat extends Component {
    state = { messages: [] };
    subscription = null

    async componentDidMount() {
        const messages = await loadMessages();
        this.setState({messages});
        this.subscription = onMessageAdded((message) => {
            console.log(message)
            this.setState({ messages: this.state.messages.concat(message) });
        })
    }

    async handleCreateMessage(text) {
        await createMessage({text});
    }

    componentWillUnmount() {
        if(this.subscription) {
            this.subscription.unsubscribe()
        }
    }

    render() {
        const { messages } = this.state
        
        return (
            <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
                <MessageList messages={messages} />
                <MessageForm onCreateMessage={this.handleCreateMessage.bind(this)} />
            </div>
        )
    }
}
