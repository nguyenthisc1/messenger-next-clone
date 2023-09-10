import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    messages: FullMessageType
}

const initialState = {
    messages: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        MESSAGES: (state, action) => {
            const { data } = action.payload
            state.messages = data.data
        }
    }
})


export const { MESSAGES } = messagesSlice.actions