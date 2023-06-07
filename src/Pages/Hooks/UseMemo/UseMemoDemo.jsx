import React, { useMemo, useState } from 'react'
import Cart from './Cart';


let cart = [
    { id: 1, name: 'iphone', price: 1000 },
    { id: 2, name: 'htc phone', price: 2000 },
    { id: 3, name: 'lg phone', price: 3000 }
];
const UseMemoDemo = () => {
    // khi setState thì sẽ dẫn đến component đều có thể chạy lại dẫn đến các biến sét cứng (như biến : cart hoặc giá trị hằng số ) và khi render lại nó sẽ tạo lại biến mới (thực ra là y nguyên như biến cũ) vì vậy nó sẽ truyền vào thằng component là 1 biến mới dẫn đến thằng memo nó cũng không nhận biết được và cũng render lại nên ta mới ' const cartMemo = useMemo(() => cart, []);'
    let [like, setLike] = useState(1);
    // let cart = [
    //     { id: 1, name: 'iphone', price: 1000 },
    //     { id: 2, name: 'htc phone', price: 2000 },
    //     { id: 3, name: 'lg phone', price: 3000 }
    // ];
    // const cartMemo = useMemo(() => cart, []); // có thể đưa biến : cart ; ra ngoài đây là 1 típ để tránh UseMemo ; vì biến này không cần thiết render lại và bạn sẽ né dc useMemo
    return (
        <div className="m-5">
            Like: {like} ♥
            <br />
            <span style={{ cursor: 'pointer', color: 'red', fontSize: 35 }} onClick={() => {
                setLike(like + 1);
            }}>♥</span>
            <br />
            <br />
            <Cart cart={cart} /> thay vì truyền useMemo ta có thể chuyền cart ở ngoài render 
        </div>
    )

}

export default UseMemoDemo