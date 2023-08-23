import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  user: any | null
  isLoggedIn: boolean
  expiresIn: number | null
}

const initialState: InitialState = {
  user: null,
  isLoggedIn: false,
  expiresIn: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    LOGIN_SUCCESS: (state, action) => {
      const { email, name, id, image,emailVerified,createdAt } = action.payload as any
      state.user = {
        id,
        email,
        name,
        emailVerified,
        image,
        createdAt
      }
      state.isLoggedIn = true
      state.expiresIn = createdAt
    },
    LOGOUT_SUCCESS: () => ({ ...initialState }),
    SET_USER: (state, { payload }: PayloadAction<FullProfile>) => {
      state.user = payload
      state.isLoggedIn = true
    },
  },
})

export const { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_USER } = authSlice.actions
