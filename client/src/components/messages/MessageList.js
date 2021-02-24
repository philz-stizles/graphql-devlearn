import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MessageList = ({ messages }) => {
    return (
        <Fragment>
        {
            messages.map(({ id, text, createdAt, user }) => {
                return (
                    <div className="comment" key={id}>
                        <div className="avatar">
                            <img alt="" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"/>
                        </div>
                        <div className="content">
                            <Link to="/" className="author">{user.name}</Link>
                            <div className="metadata"><div>Today at {createdAt}</div></div>
                            <div className="text">{text}</div>
                        </div>
                    </div>
                )
            })
        }
        </Fragment>
    )
}

MessageList.propTypes = {
    messages: PropTypes.array.isRequired,
}

export default MessageList
