import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const JobList = ({ jobs }) => {
    return (
        <div role="list" className="ui divided middle aligned list">
            {
                jobs.map(({ id, title }) => {
                    return (
                        <div role="listitem" className="item" key={id}>
                            <div className="right floated content">
                                <button className="ui button">Add</button>
                            </div>
                            <img alt="" src="https://react.semantic-ui.com/images/avatar/small/lena.png" className="ui avatar image"/>
                            <Link to={`/jobs/${id}`} className="content">{title}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

JobList.propTypes = {
    jobs: PropTypes.array.isRequired,
}

export default JobList
