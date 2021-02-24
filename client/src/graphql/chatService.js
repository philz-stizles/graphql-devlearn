import gql from 'graphql-tag'
import client from './client'

const messageDetailFragment = gql`
    fragment MessageDetail on Message {
        id
        text
        createdAt
        user {
            id
            username
        }
    }

`

export const createMessage = async (input) => {
    const mutation = gql`
        mutation CreateMessage($input: MessageInput) {
            message: createMessage(input: $input) {
                id
                text
                createdAt
                user {
                    id
                    username
                }
            }
        }
    `
    
    const { data: { message }} = await client.mutate({
        mutation, 
        variables: {input}
    })

    console.log(message)
    return message
}

export const loadMessages = async () => {
    const query = gql`
        query {
            messages {
                ...MessageDetail
            }
        }
        ${messageDetailFragment}
    `

    const { data: { messages }} = await client.query({query})
    return messages
}

export const onMessageAdded = (handleMessage) => {
    const subscription = gql`
        subscription {
            message: messageAdded {
                id
                text
                createdAt
                user {
                    id
                    username
                }
            }
        }
    `

    const observable = client.subscribe({ query: subscription })
    observable.subscribe(({data}) => {
        // console.log(data)
        handleMessage(data.message)
    })
}