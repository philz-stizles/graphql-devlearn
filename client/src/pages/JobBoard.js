import React, { Component } from 'react'
import JobList from '../components/jobs/JobList'
import Loader from '../components/Loader'
import { loadJobs } from '../graphql/jobsService'

export default class JobBoard extends Component {
    state = {
        isLoading: true,
        jobs: []
    }

    async componentDidMount() {
        const jobs = await loadJobs()
        // setTimeout(() => {
            this.setState({
                isLoading: false,
                jobs
            })
        // }, 5000)
    }

    render() {
        const { isLoading, jobs } = this.state

        if(isLoading) return <Loader />

        if(jobs) {
            return (
                <div>
                    Job Board
                    <JobList jobs={jobs} />
                </div>
            )
        }

        return null
    }
}
