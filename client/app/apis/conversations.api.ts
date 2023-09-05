import { method } from "lodash";
import { api } from ".";

const conversationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation<ConversationResponse, ConversationRequest>({
            query: (body) => ({ url: '/conversations/create', method: 'POST', body }),
            invalidatesTags: ['conversations'],
        }),
        getConversations: builder.query<ConversationsResponse, string>({
            query: (params) => ({ url: `/conversations?email=${params}`, method: "GET" }),
            providesTags: ['conversations'],
        }),
        getConversationById: builder.query<ConversationResponse, string>({
            query: (id) => ({ url: `/conversations/${id}`, method: 'GET' }),
            providesTags: ['conversations'],
        }),
        deleteConversation: builder.mutation<{ status: boolean }, { id: string, email: string }>({
            query: (body) => ({ url: `conversations/delete/${body.id}?email=${body.email}`, method: 'DELETE' }),
            invalidatesTags: ['conversations'],
        }),
        seenConversation: builder.query<SeenConversationResponse, SeenConversationRequest>({
            query: (body) => ({ url: `/conversations/${body.conversationId}/seen?email=${body.email}`, method: 'GET' }),
            providesTags: ['conversations'],
        })
    })
})

export const { useDeleteConversationMutation, useCreateConversationMutation, useGetConversationsQuery, useLazyGetConversationsQuery, useGetConversationByIdQuery, useLazyGetConversationByIdQuery, useLazySeenConversationQuery, useSeenConversationQuery } = conversationsApi