import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    members: Array<string>;
    myID: string
    // add: (id: string) => void;
    // remove: (id: string) => void;
    // set: (ids: string[]) => void;
}

const initialState: InitialState = {
    members: [],
    myID: ''
};

export const activeSlice = createSlice({
    name: "active",
    initialState: initialState,
    reducers: {
        ADD_ACTIVE: (state, action) => {
            const payload = action.payload
            state.members = [...state.members, payload]
        },
        REMOVE_ACTIVE: (state, action) => {
            const payload = action.payload
            state.members = state.members.filter((memberId) => memberId !== payload)
        },
        SET_ACTIVE: (state, action) => {
            const payload = action.payload
            state.members = payload
        },

    },
});

export const { ADD_ACTIVE, REMOVE_ACTIVE, SET_ACTIVE, } = activeSlice.actions;
