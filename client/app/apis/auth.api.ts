import { method } from "lodash";
import { api } from ".";
import storage from "../helpers/localStorage";
import { LOGIN_SUCCESS, SET_USER } from "../redux/reducer/auth.slice";

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({ url: "/auth/login", method: "POST", body }),
            onQueryStarted: async (_, api) => {
                const { data } = await api.queryFulfilled;
                // Set the returned token to Store
                storage.setAccessToken(data.token);
                // Mutate the state
                api.dispatch(LOGIN_SUCCESS(data));
            },
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({ url: "/auth/register", method: "POST", body }),
        }),
        getProfile: builder.query<FullProfile, string>({
            query: (params) => ({
                url: `/auth/profile?email=${params}`,
                method: "GET",
            }),
            onQueryStarted: async (_, api) => {
                const { data } = await api.queryFulfilled;
                api.dispatch(SET_USER(data));
            },
            providesTags: ['auth'],
        }),
        updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileResquest>({
            query: (body) => ({ url: '/auth/update', method: 'PATCH', body }),
            invalidatesTags: ['auth']
        })
    }),
});

export const {
    useLoginMutation,
    useGetProfileQuery,
    useRegisterMutation,
    useLazyGetProfileQuery,
    useUpdateProfileMutation
} = authApi;
