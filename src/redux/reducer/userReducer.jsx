//rxslice
import { createSlice } from '@reduxjs/toolkit'
import { USER_LOGIN, getStorageJSON, http, saveStorageJSON } from '../../util/config';
import { history } from '../../index';


const initStateUserLogin = () => {// hàm này dùng để quản lí : nếu đã đg nhập rồi thì sẽ lấy dữ liệu ở local chứ k có để  { email:'',accessToken:''} trống mà thay vào đó sẽ gán = data khớp với email accessToken và người dùng không phải đăng nhập lại mỗi khi reload - trừ khi người dùng đăng suất tức là xoá data ở local 
    let userLoginInit = {
        email: '',
        accessToken: ''
    }

    if (getStorageJSON(USER_LOGIN)) {//check local nếu như khác undefined thì sẽ nhảy vô if này nếu 
        userLoginInit = getStorageJSON(USER_LOGIN);// nếu stote có thì sẽ gán biến userLoginInit = data của stote và return userLoginInit;
    }
    return userLoginInit;
}


const initialState = {
    userLogin: initStateUserLogin(),//state = gọi hàm initStateUserLogin
    userProfile: {

    }
}

// const initialState = {
//     userLogin: {
//         email: '',
//         accessToken: ''
//     }
// }

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            const userLogin = action.payload;// sẽ bằng action.payload gán cho email và accessToken
            // const userLogin = hành động người dùng nhập ở trang login 
            state.userLogin = userLogin;// cái state(const initialState {userLogin :{email: '',accessToken: ''}}) sẽ bằng cái người dùng nhập gán vào state của ta (state ban đầu = rỗng )
        },
        getProfileAction: (state, action) => {
            const userProfile = action.payload;
            state.userProfile = userProfile;
// tương tự loginAction 
        }
    }
});

export const { loginAction ,getProfileAction} = userReducer.actions

export default userReducer.reducer


// ------------- action async ----------(logic Api cứ viết tổng hợp trong async action k để rải rác trong component)
// thường được sử dụng để gọi Api mà Api đó sử dụng ở nhiều chỗ ví dụ api đăng nhập , không nên copy code mà nên viết  1 cái hàm trả về async action có tham số là dispacth trong hàm đó sẽ có sử lý logic để gọi dispacth thường là loginAction (ở ví dụ này) (có 2 loại action : 1 là action thường 2 là action gọi Api có thể gọi nhiều api để có dc dữ liệu (const res = ) sau đó mới dùng Action thường đẩy lên )
// tiếp tục ở componnet cần gọi api đó ; ta sẽ dùng ActionApi để tạo ra action (loại 2) khi dispacth action loại 2 thì chưa có dữ liệu ta phải làm 1 quá trình gì đó thì nó mới có dự liệu , khi action đã cố dữ liệu rồi thì nó sẽ dùng Action loại 1 (action thường) để tạo ra action payload và đưa dữ liệu lên redux và cập nhật cho state và khi state thay đổi thì giao diện sẽ thay đổi -logic của nó  
// action async thực chất là 1 hàm return về 1 async fucntion có tham số dispacth , khi ta dispacth redux , muốn kêu 1 api thực thi thì nó phải là 1 func  ; ở dưới ta mượn const loginActionApi để đua tham số userLogin vào để có thể dispacth cái hàm async 
export const loginActionApi = (userLogin) => { //userLogin = {email:'',password:''}

    return async (dispatch) => {// dispatch nghĩa là gửi đi
        try {// try catch để bắt lỗi
            const res = await http.post(`/api/Users/signin`, userLogin);//tham số 2 là object userLogin tương đương với format data của API  ,API nó yêu cầu email và password thì phải đưa đúng thuộc tính của email và password
            //Sau khi kết quả trả về sẽ đưa lên loginAction
            const action = loginAction(res.data.content);
            //const action = {type:'userReducer/loginAction', payload: res.data.content}
            dispatch(action);
            // thành công thì lưu vào local 
            saveStorageJSON(USER_LOGIN, res.data.content)

              //SAu khi đăng nhập thành công thì chuyển hướng trang sang profile
           history.push('/profile')

        } catch (err) {
            alert(err.response?.data.message);
        }
    }
}


export const getProfileActionApi = () => {

    return async (dispatch, getState) => {
//tham số thứ 2 getState ít khi dc sử dụng nhưng có lúc sẽ cần tới 
// tham số thư 1 dispacth là để có dữ liệu từ api ta sẽ dispacth dữ liệu lên redux 
// tham số thứ 2 getState : cái hàm này luôn trả cho ta hàm thứ 2 là getState()-rất ít khi sử dụng getState chính là cục state của toàn bộ ứng dụng (có redux) nó có thể lấy state từ các reducer khác luôn 
        const accessToken = getState().userReducer.userLogin.accessToken;

        //Gọi api getprofile
        const res = await http.post(`/api/Users/getProfile`, {}, {
            //config header
            /*nguyên tắc :khi có accessToken thì truyền vào tham só thứ 3 chính là cái phần header - ở phần requet sẽ có 2 phần chính body và header , body là cái phần mà ta hay  gửi dữ liệu đi có format giống với backend yêu cầu, đối phần body người dùng nhập gì thì sẽ tự tạo ra object giống như vậy và những sử lí như onclick , nhập liệu ... của người dùng ta bỏ vào phần này
            còn phần header là phần dev sẽ cài ngầm (k lấy thông tin gì từ người dùng) thì người dùng không cần nhập mà dev sẽ lấy thông tin ngầm (lấy token lấy email )  */
            headers: {// headers (tham số thứ 3)
                Authorization: `Bearer ${accessToken}`
            }
        });

        const action = getProfileAction(res.data.content);
        dispatch(action);

    }
}