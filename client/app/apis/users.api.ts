import { api } from ".";
import { MEMBERS } from "../redux/reducer/active.slice";

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getListUserNotCurrent: builder.query<GetUserResponse,  string >({
            query: (params) => ({url: `users/list?email=${params}`, method: 'GET'}),
        }),
        getListUser: builder.query<GetUserResponse, void>({
            query: () => ({url: `users/list`, method: 'GET'}),
            onQueryStarted: async (_, api) => {
                const {data} = await api.queryFulfilled
                api.dispatch(MEMBERS(data))
            }
        })
    })
})

export const { useGetListUserQuery, useLazyGetListUserQuery, useGetListUserNotCurrentQuery, useLazyGetListUserNotCurrentQuery } = usersApi