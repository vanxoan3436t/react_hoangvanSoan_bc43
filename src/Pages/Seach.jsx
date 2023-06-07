import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Seach = () => {

    const keywordRef = useRef('');

    const [arrProd, setArrProd] = useState([]);

    const [keyword, setKeyword] = useSearchParams();

    useEffect(() => {
        //lấy ra keyword => khác rỗng thì mới gọi api
        const kWord = keyword.get('k');
        if (kWord !== '') {
            getProdByKeyword(kWord)
        }

    }, [keyword.get('k')]); // keyword trên url thay đổi thì uesEffect này sẽ chạy



    const getProdByKeyword = async (keyword) => {
        const result = await axios({
            url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
            method: 'GET'
        });
        //Đưa dữ liệu tự lấy Api về vào state
        setArrProd(result.data.content)
    }



    const handleChange = (e) => {
        const { id, value } = e.target;
        keywordRef.current = value;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //đưa keyword lên param
        setKeyword({
            k: keywordRef.current

        })
    }



    return (
        <div className='container'>
            <h3>Tìm kiếm sản phẩm</h3>
            <form className="form-group" onSubmit={handleSubmit}>
                <input id='keyword' className='form-control' onInput={handleChange} />
                <button className='btn btn-dark'> Seach</button>
            </form>
            <h3>Kết quả tìm thấy ({arrProd.length})</h3>
            <div className="row">
                {arrProd.map((item, index) => {
                    return <div className="col-4" key={index}>
                        <div className="card">
                            <img className='w-100' src={item.image} alt="" />
                            <div className="card-body">
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                                <NavLink className={'btn btn-dark'} to={`/detail/${item.id}`}>
                                    <i className='fa fa-eye'></i>
                                    View detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}

export default Seach