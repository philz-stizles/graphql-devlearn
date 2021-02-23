import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createJob } from '../services/graphql/jobs'

export default class JobForm extends Component {
    state = {
        jobForm: {
            title: "",
            description: "",
            duration: "CONTRACT",
            closingAt: "",
            salary: 0
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const newJob = {
            id: uuidv4(),
            ...this.state.jobForm
        }

        createJob(newJob).then(job => {
            console.log(job)
            this.props.history.push(`/jobs/${job.id}`)
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            jobForm: {
                ...this.state.jobForm,
                [name]: (name === 'salary' ? parseFloat(value) : value)
            }
        })
    }



    render() {
        const { title, description, salary, duration, closingAt } = this.state
        return (
            <div className="ui card fluid">
                <div className="content">
                    <div className="header">Create a New Job</div>
                </div>
                <div className="content">
                    <form onSubmit={this.handleSubmit} className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input name="title" value={title} onChange={this.handleChange} placeholder="Title"/>
                        </div>

                        <div className="field">
                            <label>Description</label>
                            <textarea name="description" value={description} onChange={this.handleChange} placeholder="Tell us about the job..." rows="3"></textarea>
                        </div>
                        
                        <div className="field">
                            <label>Salary</label>
                            <input name="salary" value={salary} onChange={this.handleChange} type="number" step="0.50" min="0" defaultValue="0.00" placeholder="Last Name"/>
                        </div>

                        <div className="field">
                            <label>Duration</label>
                            <select required name="duration" value={duration} onChange={this.handleChange}>
                                <option value="CONTRACT">Contract</option>
                                <option value="PERMANENT">Permanent</option>
                            </select>
                        </div>
                        
                        <div className="field">
                            <label>Closing Date</label>
                            <input name="closingAt" value={closingAt} onChange={this.handleChange} type="date" placeholder="Date"/>
                        </div>

                        <button type="submit" className="ui button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
