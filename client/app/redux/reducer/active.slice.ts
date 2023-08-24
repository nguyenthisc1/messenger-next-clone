import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    members: Array<string>;
    // add: (id: string) => void;
    // remove: (id: string) => void;
    // set: (ids: string[]) => void;
}

const initialState: InitialState = {
    members: [],
};

export const activeSlice = createSlice({
    name: "active",
    initialState: initialState,
    reducers: {
        MEMBERS: (state, action) => {
            const { data } = action.payload as any;

            state.members= data.map((user: any) => ({
                id: user.id, name: user.name,email: user.email
            }));
        ;
        },
    },
});

export const { MEMBERS } = activeSlice.actions;
