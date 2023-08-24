
import { combineReducers } from 'redux';
import { authSlice } from './auth.slice';
import { activeSlice } from './active.slice';
import { api } from '@/app/apis';

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    active: activeSlice.reducer,
    [api.reducerPath]: api.reducer,
})