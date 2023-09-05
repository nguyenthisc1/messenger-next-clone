import { api } from "."
import { MESSAGES } from "../redux/reducer/messages.slice"


const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<MessagesResponse, string>({
            query: (id) => ({ url: `/messages/${id}`, method: 'GET' }),
            providesTags: ['messages', 'conversations', 'auth'],
            // onQueryStarted: async (_, api) => {
            //     const { data } = await api.queryFulfilled
            //     api.dispatch(MESSAGES(data))
            // }
        }),
        postMessages: builder.mutation<PostMessageResponse, PostMessageRequest>({
            query: (body) => ({ url: `messages/post`, method: 'POST', body }),
            invalidatesTags: ['messages', 'conversations', 'auth'],
        })
    })
})

export const { useGetMessagesQuery, useLazyGetMessagesQuery, usePostMessagesMutation } = messageApi