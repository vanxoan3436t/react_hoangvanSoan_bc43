import React, { useState, useRef } from 'react'
import ChildComponent from './ChildComponent'

const UseRefDemo = () => {
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''

    })

    const [number, setNumber] = useState(1);

    const inputRef = useRef({});

    //useRef : dùng đẻ lưu lại các giá trị thay đổi sau các lần render mà không cần render lại giao diện (ví dụ có 1 state nào đó làm thay đổi giao diện thì useRef sẽ ngăn giá trị ... ?) .Sử dụng cho các trường hợp đặc biệt của state (state thay đổi tuy nhiên state không binding lên giao diện)
    //


    const userLoginRef = useRef({// để trong useRef thì sẽ không bị mất; useRef thay thê useState trong trường hợp useState k binding lên giao diện

        username: '',
        password: ''
    })

    // console.log('userLogin', userLogin)

    const handleChangeInput = (e) => {
        let { id, value } = e.target;
        userLoginRef.current[id] = value;
        console.log('userLogin', userLoginRef.current)

        // setUserLogin({
        //     ...userLogin,// bên func thì phải có 3 dấu chấm bên trước thì mới có thể giữ lại ob cũ tránh việc có mới nới cũ
        //     [id]: value   

        // })
    }

    const handleSubmit = (e) => {
        e.preventDefaule();

        inputRef.current.style.backgroundColor = 'pink'
    }
    return (
        <form className='container' onSubmit={handleSubmit}>

            <button type='button' onClick={() => {
                setNumber(number + 1);
            }}>+</button>

            <ChildComponent />

            <h3>Login </h3>
            <div className="form-group">
                <p>userName</p>
                <input ref={inputRef} className='form-control' id='username' onInput={handleChangeInput} />
            </div>
            <div className="form-group">
                <p>password</p>
                <input className='form-control' id='password' onInput={handleChangeInput} />
            </div>
            <div className="form-group">
                <button type='submit' className='btn btn-dark'>Submit</button>

            </div>
        </form>
    )
}

export default UseRefDemo