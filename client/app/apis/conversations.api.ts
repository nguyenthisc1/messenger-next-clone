import { api } from ".";

const conversationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation<ConversationRequest, ConversationResponse>({
            query: (body) => ({ url: '/conversations/conversation/create', method: 'POST', body })
        }),
        getConversations: builder.query<ConversationsRequest, string>({
            query: (params) => ({ url: `/conversations/conversations?email=${params}`, method: "GET" })
        }),
        getConversationById: builder.query<ConversationsRequest, string>({
            query: (id) => ({ url: `/conversations/conversation/${id}`, method: 'GET' })
        })
    })
})

export const { useCreateConversationMutation, useGetConversationsQuery, useLazyGetConversationsQuery, useGetConversationByIdQuery, useLazyGetConversationByIdQuery } = conversationsApi