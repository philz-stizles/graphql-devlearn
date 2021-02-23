import React, { Component } from 'react'
import JobList from '../components/jobs/JobList'
import Loader from '../components/Loader'
import { loadCompany } from '../graphql/jobsService'

export default class CompanyDetail extends Component {
    state = {
        isLoading: true,
        company: null
    }

    async componentDidMount() {
        const { match } = this.props
        const company = await loadCompany(match.params.id)
        this.setState({
            isLoading: false,
            company
        })
    }
    
    render() {
        const { isLoading, company } = this.state

        if(isLoading) return <Loader />

        if(company) {
            return (
                <div>
                    <div className="ui divided items">
                        <div className="item">
                            <div className="image">
                                <img alt="" src="https://react.semantic-ui.com/images/wireframe/image.png"/>
                            </div>
                            <div className="content">
                                <a href="#!" className="header">{company.name}</a>
                                <div className="description">
                                    {company.description}
                                </div>
                                <div className="extra">
                                    <div className="ui label">Other Stuff</div>
                                    <div className="ui label"><i aria-hidden="true" className="globe icon"></i>SoMe Stuff</div>
                                </div>
                                <div className="ui label">Jobs at {company.name}</div>
                                <JobList jobs={company.jobs} />
                            </div>
                        </div>
                    </div>  
                </div>
            )
        }
    }
}
