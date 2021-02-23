import gql from 'graphql-tag'
import client from './'

export const loadJobs = async () => {
    const query = gql`{
        jobs {
            id
            title
            description
            company {
                id
                name
                description
            }
        }
    }`

    const { data: { jobs }} = await client.query({query})
    return jobs
}

const jobQuery = gql`
    query getJob($id: ID!) {
        job(id: $id) {
            id
            title
            description
            postedAt
            closingAt
            salary
            company {
                id
                name
                description
            }
        }
    }
`

export const loadJob = async (id) => {
    const { data: { job }} = await client.query({query: jobQuery, variables: {id}})
    return job
}

export const loadCompany = async (id) => {
    const query = gql`
        query getCompany($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                }
            }
        }
    `
    
    const { data: { company }} = await client.query({query, variables: {id}})
    return company
}

export const createJob = async (input) => {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput) {
            job: createJob(input: $input) {
                id
                title
                description
                company {
                    name
                }
            }
        }
    `
    
    const { data: { job }} = await client.mutate({
        mutation, 
        variables: {input},
        update: (cache, { data }) => {
            cache.writeQuery({
                query: jobQuery, 
                variables: {id: data.job.id},
                data
            })
        }
    })
    return job
}