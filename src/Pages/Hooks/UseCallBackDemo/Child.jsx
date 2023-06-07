import React ,{memo} from 'react'
//memo hàm chống rerender của component nếu component k thay đổi thì nó không rerender lại
const Child = (props) => {

    console.log('child render')
    return (
        <div className='bg-dark text-white my-2 p-3 fs-3'>
            Child : {props.uiLike()}


        </div>
    )
}

export default memo(Child)// dùng bằng cách bọc trong dấu ngoặc (nếu truyền ob thì nhớ : ... ; giống như class component)