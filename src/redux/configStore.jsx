import {configureStore} from '@reduxjs/toolkit';
import appChatReducer from './reducer/appChatReducer';
import userReducer from './reducer/userReducer';
import quanLyPhimReducer from './reducer/quanLyPhimReducer';


export const store = configureStore({
    reducer: {
        appChatReducer,
        userReducer:userReducer,
        quanLyPhimReducer:quanLyPhimReducer
    }
})