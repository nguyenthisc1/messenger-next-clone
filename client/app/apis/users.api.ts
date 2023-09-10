import { api } from ".";

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getListUserNotCurrent: builder.query<GetUserResponse, string>({
            query: (params) => ({ url: `users/list?email=${params}`, method: 'GET' }),
        }),
        getListUser: builder.query<GetUserResponse, void>({
            query: () => ({ url: `users/list`, method: 'GET' }),
         
        })
    })
})

export const { useGetListUserQuery, useLazyGetListUserQuery, useGetListUserNotCurrentQuery, useLazyGetListUserNotCurrentQuery } = usersApi