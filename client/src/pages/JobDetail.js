import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { loadJob } from '../graphql/jobsService'

export default class JobDetail extends Component {
    state = {
        isLoading: true,
        job: null
    }

    async componentDidMount() {
        const { match } = this.props
        const job = await loadJob(match.params.id)
        this.setState({
            isLoading: false,
            job
        })
    }

    render() {
        const { isLoading, job } = this.state

        if(isLoading) return <Loader />

        if(job) {
            return (
                <div>
                    <div className="ui divided items">
                        <div className="item">
                            <div className="image">
                                <img alt="" src="https://react.semantic-ui.com/images/wireframe/image.png"/>
                            </div>
                            <div className="content">
                                <a href="#!" className="header">{job.title}</a>
                                <div className="meta"><span className="cinema">{job.postedAt}</span></div>
                                <div className="description">
                                    {job.description}
                                </div>
                                <div className="extra">
                                    <div className="ui label">${job.salary}</div>
                                    <Link to={`/companies/${job.company.id}`} className="ui label"><i aria-hidden="true" className="globe icon"></i>{job.company.name}</Link>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            )
        }
    }
}
