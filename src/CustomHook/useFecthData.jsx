//rfc
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
/**
 * 1 hook thực hiện chức năng call api dựa vào tham số url => trả về data sau khi gọi api thành công 
 * @param {*} url là đường dẫn đến api backend 
 * @returns dữ liệu trả về kết quả là từ api
 */


export default function useFecthData(url) {
    const [data, setData] = useState([]);

    const getDataApi = async () => {
        const res = await axios({
            url: url,
            method: 'GET'
        });
        setData(res.data.content)
    }

    useEffect (() => {
     getDataApi();   
    },[])
    return data
}