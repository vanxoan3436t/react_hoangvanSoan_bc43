//rxslice
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    arrComment: [
        { name: 'Van Xoan provip', content: 'bá chủ Nước Mẽo là tao' },
        { name: 'Van Xoan provip x2', content: 'bá chủ Nước Mẽo là tao, acb' }
    ]
}

const appChatReducer = createSlice({
    name: 'appChatReducer',
    initialState,
    reducers: {

        addCommentAction: (state, action) => {
            // Lấy dữ liệu action từ payload
            const userComment = { ...action.payload };

            state.arrComment.push(userComment);
        }
    }
});

export const { addCommentAction } = appChatReducer.actions

export default appChatReducer.reducer