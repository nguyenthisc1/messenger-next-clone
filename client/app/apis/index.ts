// import storage from '$/helpers/localStorage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import storage from '../helpers/localStorage'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3005/api',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Accept-Language': 'vn',
  },
  prepareHeaders(headers) {
    const token = storage.getAccessToken()
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})
// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ['conversations','users', 'messages', 'auth'],
})
