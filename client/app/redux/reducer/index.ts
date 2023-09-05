
import { api } from '@/app/apis';
import { combineReducers } from 'redux';
import { activeSlice } from './active.slice';
import { authSlice } from './auth.slice';
import { messagesSlice } from './messages.slice';

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    active: activeSlice.reducer,
    messages: messagesSlice.reducer,
    [api.reducerPath]: api.reducer,
})