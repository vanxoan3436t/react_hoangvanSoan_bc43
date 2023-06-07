//rafce
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { http } from '../../util/config';

//chỉ gọi hook ở trên cùng
// không gọi hook bên trong loop, câu điệu kiện , hay các funtion lồng với nhau
// chỉ dùng hook với react function 
const UseEffectDemo = (props) => {
    console.log('component render')
    const [number, setNumber] = useState(0);
    const [arrProduct, setArrayProduct] = useState([]);// list product
    const [prodDetail, setProdDetail] = useState({
        image: '123'
    });


    // useEffect(() => {
    //     // UseEffect :
    //     /*
    //     chạy sau khi component render (tương đương didmount)
    //     chạy sau mỗi lần updating (state hoặc props thay đổi)((tương đương didmount update))
    //     */
    //     console.log('useEffect run')
    // })

    useEffect(() => {// không có tham số sẽ chỉ chạy 1 lần
        /*
       Chạy như lifecycle componentdidmount (Dùng để call api không có tham số)
        */
        console.log('useEffect didmount run')
        // có thể gọi nhiều api cùng lúc
        getAllProduct();
    }, [])

    useEffect(() => {//chỉ cần useState thay đổi thì sẽ thực hiện logic trong đây
        /*
        Tương tự componentDidUpdate thường dùng để setState có tham số 
        */
        // mỗi lần number thay đổi thì hàm này sẽ tự kích hoạt (number = id vì k có id đặt = không bao giờ)

        if (number !== 0) {
            getProdDetail(number);
        }

    }, [number])

    //-------------------------------------------

    useEffect(() => {

        const timeout = setInterval(() => {
            console.log('1', 1)
        }, 1000)
        return () => {// lệnh return này có thể viết ở tất cả các useEffect khác
            //hàm này sẽ chạy khi component mất khỏi Dom (mất khỏi giao diện) tương tự componentWillUnmount
            clearInterval(timeout)
        }
    }, [])
    //-----------------------------------------------------------
    const getProdDetail = async (id) => {
        const result = await http.get(`/api/Product/getbyid?id=${id}`);
        //Sau khi lấy dữ liệu tư api về đưa vào state arrProduct 
        setProdDetail(result.data.content)
    }

    console.log('arrProduct', arrProduct)
    const getAllProduct = async () => {
        const result = await http.get(`/api/product`);
        //  axios({
        //     url: 'https://shop.cyberlearn.vn/api/Product',
        //     method: 'GET'
        // });
        //Sau khi lấy dữ liệu tư api về đưa vào state arrProduct 
        setArrayProduct(result.data.content)
    }

    return (
        <div className='container'>
            <h3>Number : {number}</h3>
            <button className='btn btn-dark' onClick={() => {
                setNumber(number + 1);
            }}>+</button>
            <hr />
            <h3>Product Detail </h3>
            <img className='w-25' src={prodDetail.image} alt="???" onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images2.thanhnien.vn/528068263637045248/2023/4/17/ygphunhanrosekangdongwonhenho14-1681738309251368900159.png";
            }
            } />

            <button className='btn btn-dark mx-2' onClick={() => {
                setNumber(number - 1);// code lại để number k bé hơn 1
            }}>Prev</button>

            <button className='btn btn-dark mx-2' onClick={() => {
                setNumber(number + 1);// code lại để number k lớn hơn list product 19 list
            }}>Next</button>
            <hr />
            <h3>Product list </h3>
            <div className="row">
                {arrProduct.map((item) => {
                    return <div className='col-3' key={item.id} >
                        <div className="card">
                            <img src={item.image} alt="..." />
                            <div className="card-body">
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                                <button className='btn btn-danger' onClick={() => {
                                    setNumber(item.id);// number = item.id và chỉ cần thay đổi number thì sẽ render lại phần Product Detail
                                }}>
                                    View detail
                                </button>
                            </div>
                        </div>
                    </div>
                })}
            </div>



        </div>
    )
}

export default UseEffectDemo