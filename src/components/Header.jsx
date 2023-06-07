import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { USER_LOGIN, clearStorage } from '../util/config';
export default function Header() {

    const { userLogin } = useSelector(state => state.userReducer);// hàm useSelector để lấy state về từ componnet phải không ?
    const renderLoginLink = () => {
        if (userLogin.email !== '') {
// kiểm tra email nếu rỗng thì thẻ Nalink k thay đổi text
            return <>
                <li className='nav-item'>
                    <NavLink className="nav-link" to="/profile">Hello ! {userLogin.email}</NavLink>
                </li>
                <li className='nav-item'>
                    <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => {
                        // khi ấn vào nút Logout thì sẽ xoá data ở local đi
                        clearStorage(USER_LOGIN);
                        window.location.reload(); //f5 reload lại 
                    }}>Logout</span>
                </li>
            </>
        }

        return <NavLink className="nav-link" to="/login">Login</NavLink>
    }

    return (// cú pháp tạo nhanh bs5-navbar-backround

        <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
            <NavLink className="navbar-brand" to="/">Cybersoft</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/" aria-current="page">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/movie" aria-current="page">Movie </NavLink>
                    </li>
                    {renderLoginLink()}
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li> */}

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hooks</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <NavLink className="dropdown-item" to="/usestate"> Use-state</NavLink>

                            <NavLink className="dropdown-item" to="/useeffect"> Use-Effect</NavLink>

                            <NavLink className="dropdown-item" to="/usecallback"> Use-CallBack</NavLink>

                            <NavLink className="dropdown-item" to="/usememo"> Use-Memo</NavLink>

                            <NavLink className="dropdown-item" to="/useref"> Use-Ref</NavLink>

                            <NavLink className="dropdown-item" to="/demo-chat">Redux-App chat</NavLink>

                            {/* <NavLink className="dropdown-item" to="/profile">Redux-UseParams</NavLink> */}

                            <NavLink className="dropdown-item" to="/detail">Redux-UseParams detail</NavLink>

                            <NavLink className="dropdown-item" to="/seach">Redux-UseSeach Params</NavLink>
                        </div>
                    </li>
                </ul>
                <form className="d-flex my-2 my-lg-0">
                    <input className="form-control me-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    )
}
