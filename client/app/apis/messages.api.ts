import { api } from "."


const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<MessagesResponse, string>({
            query: (id) => ({ url: `/messages/messages/${id}`, method: 'GET' })
        })
    })
})

export const { useGetMessagesQuery, useLazyGetMessagesQuery } = messageApi