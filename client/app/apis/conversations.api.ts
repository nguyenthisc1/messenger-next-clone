import { api } from ".";



const conversationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        conversation: builder.mutation<ConversationRequest, ConversationResponse>({
            query: (body) => ({url: '/conversations/conversation', method: 'POST', body})
        }),
        getConversations: builder.query<ConversationsRequest, string>({
            query: (params) => ({url: `/conversations/conversations?email=${params}`, method: "GET"})
        })
    })
})

export const {useConversationMutation, useGetConversationsQuery, useLazyGetConversationsQuery} = conversationsApi