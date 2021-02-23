import { getToken, isLoggedIn } from './../../utils/auth'
const graphQLURI = 'http://localhost:9000/graphql'

const graphqlRequest = async (query, variables = {}) => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query,
            variables
        })
    }
    
    if(isLoggedIn){
        request.headers['Authorization'] = `Bearer ${getToken()}`
    }

    try {
        const response = await fetch(graphQLURI, request)

        const responseBody = await response.json()
        console.log(responseBody)
        if(responseBody.errors) {
            const message = responseBody.errors.map()
            throw new Error(message)
        }
        return responseBody.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const loadJobs = async () => {
    const { jobs } = await graphqlRequest(`{
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
    }`)

    return jobs
}

export const loadJob = async (id) => {
    const { job } = await graphqlRequest( `query getJob($id: ID!) {
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
    }`, { id })
    
    return job
}

export const loadCompany = async (id) => {
    const { company } = await graphqlRequest( `query getCompany($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }`, { id })
    
    return company
}

export const createJob = async (input) => {
    const { job } = await graphqlRequest( `mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) {
            id
            title
            description
            company {
                name
            }
        }
    }`, { input })
    
    return job
}