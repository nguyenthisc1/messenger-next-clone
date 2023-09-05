import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    messages: FullMessageType[]
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
            state.messages = data
        },
        ADD_MESSAGE: (state, action) => {
            const data = action.payload
            console.log("🚀 ~ file: messages.slice.ts:22 ~ action:", data)
        }
    }
})


export const { MESSAGES, ADD_MESSAGE } = messagesSlice.actions