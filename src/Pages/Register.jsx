import React from 'react'

//Lấy dữ liệu từ form (bằng thư viện formik)
import { useFormik } from 'formik';// hook của thư viện formik 
import * as yup from 'yup';// import tất cả trong yup và biến tên thành yup
import { http } from '../util/config';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
    const navigate = useNavigate()
    const registerFrm = useFormik({
        initialValues: {//initialValues là giá trị khởi tạo ban đầu của các trường input ; lấy theo: name ; vd: name='email' 
            //khi nhập liệu ở các trường input thì sẽ  mặc định bilding lên ob này , khi ấn nút submit hoặc nút enter thì dữ liệu sẽ nhảy vô thuộc tính: onSubmit phía dưới  
            email: '',
            password: '',
            gender: '',
            name: '',
            phone: ''
        },
        validationSchema: yup.object().shape({// validation của thư viện ,là validation chuẩn của các kiểu cơ bản 
            email: yup.string().required('email cannot be blank!').email('Email is invalid !'),//required là check bỏ trống 
            password: yup.string().required('password cannot be blank!').min(6, '6 - 32 characters').max(32, '6 - 32 character'),
            name: yup.string().required('name cannot be blank'),
            phone: yup.string().required('phone cannot be blank').matches(/\d$/, 'phone is numbers')
        }),
        onSubmit: async (values) => {//onSubmit là thuộc tính mà thư viện làm cho chúng ta luôn ; giờ không phải viết hàm e.preventDefault 
            console.log(values);
            try {
                // tại sao dùng try - catch ? 
                //Lấy dữ liệu từ form => call api gửi dữ liệu đi
                const res = await http.post('/api/Users/signup', values);//http.post ; http lấy từ DOMAIN ta đã setup từ trước (file config) ; post là bên BackEnd đặt tên là post nên ta chỉ cần http.post
                console.log('res', res)
                alert(res.data?.message);
                navigate('/login');// dùng hook useNavigate của react router dom làm j ? => để làm nếu đăng kí thành công sẽ chuyển hường qua trang login
            }catch(err) {
                console.log(err.response.data);
                alert(err.response.data.message);

            }

        }
    })

    return (
        <form className='container' onSubmit={registerFrm.handleSubmit}>

            <h3>Register</h3>
            khi validation <br /> registerFrm.errors.password đúng thì mới chạy vế bên phải theo biểu thức: && (biểu thức && chỉ cần 1 sai thì sẽ không chạy nữa) vế bên phải là dòng text 'thể hiện bằng thẻ p' <br /> Trên UI sẽ là đoạn text nền màu đỏ thể hiện lỗi vd: <span className='text-danger'> email cannot be blank!</span> 
            <div className="row mt-4">
        
                <div className="col-6 ">
                    <div className="form-group">
                  
                        <p>Email</p>
                        <input className='form-control' id='email' name='email' onInput={registerFrm.handleChange} onBlur={registerFrm.handleBlur} />
                        {registerFrm.errors.email && <p className='alert alert-danger'>{registerFrm.errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <p>Password</p>
                        <input className='form-control' id='password' name='password' type='password' onInput={registerFrm.handleChange} onBlur={registerFrm.handleBlur}/>
                       
                        {registerFrm.errors.password && <p className='alert alert-danger'>{registerFrm.errors.password}</p>}
                    </div>

                    <div className="form-group mt-2">
                        <p>Gender</p>
                        <input className='form-check-input ' id='gender1' name='gender' type='radio' value={true} onInput={registerFrm.handleChange} />
                        <label for='gender1'>Male</label>
                        <input className='form-check-input ms-2' id='gender2' name='gender' type='radio' value={false} onInput={registerFrm.handleChange} />
                        <label for='gender2'>Female</label>
                    </div>
                </div>

                <div className="col-6">

                    <div className="form-group">
                        <p>Name</p>
                        <input className='form-control' id='name' name='name' onInput={registerFrm.handleChange} onBlur={registerFrm.handleBlur} />
                        {registerFrm.errors.name && <p className='alert alert-danger'>{registerFrm.errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <p>Phone</p>
                        <input className='form-control' id='phone' name='phone' type='number' onInput={registerFrm.handleChange} onBlur={registerFrm.handleBlur} />
                        {registerFrm.errors.phone && <p className='alert alert-danger'>{registerFrm.errors.phone}</p>}
                    </div>

                    <div className='form-group mt-2'>
                        <button type='submit' className='btn btn-dark' disabled={!registerFrm.isValid}>Submit</button>
                    </div>
                </div>

            </div>



        </form>
    )
}

export default Register