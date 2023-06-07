import axios from 'axios'
import {history} from '../index';
//cấu hình hệ thống ; chỉ cấu hình 1 lần trong dự án ; trong 
export const DOMAIN = 'https://shop.cyberlearn.vn';// link API 
export const USER_LOGIN = 'userLogin';// tạo để quản lí tên biến (hằng số ) lát gọi các const USER_LOGIN ='userLogin'; có thể dùng Các name : USER_LOGIN SẼ DC THỐNG NHẤT


export const TOKEN = 'accessToken';//tạo để quản lí tên biến (hằng số ) lát gọi các const TOKEN ='accessToken'; có thể dùng Các name : TOKEN SẼ DC THỐNG NHẤT

const tokenCybersoft = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.7A1g8RqPPK_ttr9NYitsWT7Cbe11nz4qye-QxZ_b8fk`

export const httpMovie = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn',
    timeout: 30000
});
//interceptor
httpMovie.interceptors.request.use((config) => {
    config = { ...config };
    config.headers['TokenCybersoft'] = tokenCybersoft// config.headers['TokenCybersoft'] ; ví dụ mà người ta ghi cái tham số kiểu (có kí tự đăc biệt ở giữa) ['content-type'] gì đó thì ta có thể ghi dạng kiểu này :headers['content-type'] ,tên object[tên thuộc tính] nó sẽ chuẩn hơn vì đôi lúc còn có dâu gach ở giữa
    return config;
}, err => {
    return Promise.reject(err);
})
//Cấu hình api gửi đi 
//Tạo ra 1 đối tượng axios 
export const http = axios.create({
    baseURL: DOMAIN, //domain của tất cả request
    timeout: 30000 //thời gian request tồn tại // đây là trong vòng 30000 = 5 phút ; hết thời gian thì sẽ out
});

export const { saveStorageJSON, getStorageJSON, clearStorage } = {
    saveStorageJSON: (name, data) => {//lưu dữ liệu vào local
        const string = JSON.stringify(data);
        localStorage.setItem(name, string);
    },
    getStorageJSON: (name) => {
        if (localStorage.getItem(name)) {// lấy dữ liệu của local thì phải kiểm tra nếu local có thì sẽ retunt về cái data k thì sẽ về undefined
            const data = JSON.parse(localStorage.getItem(name));
            return data;
        }
        return undefined;
    },
    clearStorage: (name) => {//removeItem xoá 
        localStorage.removeItem(name)
    }
}

// Cấu hình dùng chung cho tất  cả request
http.interceptors.request.use((config) => {
    //headers:(dev định nghĩa)
    //data (body): (lấy từ các input hoặc tham số từ phía client)
    config.headers = { ...config.headers }
    let token = getStorageJSON(USER_LOGIN)?.accessToken;// ? nếu không có thì trả null thì là chưa đăng nhập
    config.headers.Authorization = `Bearer ${token}`
    config.headers.tokenCybersoft = `CybersoftDemo`;
    return config;

}, (err) => {
    return Promise.reject(err);
})
//Cấu hình cho response (Kết quả trả về từ api)
http.interceptors.response.use((res) => {
    return res;
  
}, (err) => {
    console.log('err', err)
    //Xử lý lỗi cho api
    if (err.response?.status === 401) {
        alert('Đăng nhập để vào trang này !');
        history.push('/login');
    }
    return Promise.reject(err)
});

/* stateCode thông dụng
200 : Dữ liệu gửi đi và nhận về kết quả thành công (OK)
201 : Dữ liệu khởi tạo thành công  (Created)
400 : Bad request (lỗi không thìm thấy item trên backend) 
404 : Not found (Không thìm thấy link backend)
500 : Error in server (Lỗi xảy ra tại sever - có thể dữ liệu frontend gửi lên xử lí bị lỗi backend không catch trường hợp này thì ra 500 hoặc là backend code bị lỗi ) => Xác định lỗi => mở post man request thử với data đúng thì có được hay không nếu lỗi thì báo backend fix
401: UnAuthorize (Lỗi khi không có quyền truy cập vào api này (phải token hợp lệ ...))
403 :Forbiden (Lỗi chưa đủ quyền truy cập vào api)
*/
