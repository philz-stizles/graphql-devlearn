import React from 'react'

function Loader(props) {
    return (
        <div className="ui segment">
            <div className="ui active transition visible dimmer">
                <div className="content">
                    <div className="ui loader"></div>
                
                </div>
            </div>
            <img alt="short paragraph" src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" className="ui image"/>
        </div>
    )
}

export default Loader

