//rxslice
import { createSlice } from '@reduxjs/toolkit'
import { httpMovie } from '../../util/config';

const initialState = {
    arrFilm: []
}

const quanLyPhimReducer = createSlice({
    name: 'quanLyPhimReducer',
    initialState,
    reducers: {
        getALLFilmAction: (state, action) => {
            state.arrFilm = action.payload;
        }
    }
});

export const { getALLFilmAction } = quanLyPhimReducer.actions

export default quanLyPhimReducer.reducer

//-------get api phim ----------
export const getALLFilmApi = () => {
    return async (dispatch) => {

        //gọi api và dùng action getAllFilmAction đưa store 
        const res = await httpMovie.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05`);
        
        //tạo action đưa lên redux
        const action = getALLFilmAction(res.data.content);
        console.log('action', action)
        dispatch(action);
    }
}