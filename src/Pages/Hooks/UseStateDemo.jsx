import React, { useState } from 'react'

//usestate : quản lý sự thay đổi của  giao diện , hooks này thay thế cho state của class react

const 
UseStateDemo = () => {//arrow func loại bỏ con trỏ this: theo lý thuyết của ES6
    //mỗi 
    let [number, setNumber] = useState(10);// result = [state,setState] => {state1: '',state2: ''}

    let [fontSize, setFontSize] = useState(16);// result = [state,setState]

    let [imgSrc, setImgSrc] = useState('https://i.pravatar.cc?u=40')

    const changNumber = () => {
        let newNumber = number + 1;
        setNumber(newNumber);// hàm này chỉ cần nhả cho nó 1 giá trị mới thì nó sẽ làm thay đổi number(giá trị cũ = giá trị mới ) = newNumber và render lại giao diện
    }
    return (
        <div >
            <h3>Demo tăng giảm số lương</h3>
            <h3>Number :{number}</h3>
            <button className='btn btn-dark' onClick={() => {
                changNumber();
            }}>+</button>
            <hr />
            <h3>Tăng giảm fontSize</h3>
            <p style={{ fontSize: fontSize }}>mặc định fontSize là 16px gán style : fontSize = fontSize (của useState) <br /> mỗi lần ấn dấu ' + ' hoặc dấu ' - ' thì sẽ tăng hoặc giảm 1.5 px</p>

            <button className='btn btn-primary me-3' onClick={() => {
                setFontSize(fontSize + 1.5);
            }}>+</button>
            <button className='btn btn-danger' onClick={() => {
                setFontSize(fontSize - 1.5)
            }}>-</button>
            <hr />

            <h3>Tinder</h3>
            <div className="card w-25 my-2">
                <img src={imgSrc} alt="...////" />
                <div className="card-body">
                    <button className='btn btn-danger' onClick={() => {

                        let numberRandom = Math.floor(Math.random() * 101);//hàm random của js có sẵn về hãy nghiên cứu thêm
                        let newImg = `https://i.pravatar.cc?u=${numberRandom}`;
                        setImgSrc(newImg);
                    }}>Random</button>
                </div>
            </div>
        </div>
    )
}
export default UseStateDemo