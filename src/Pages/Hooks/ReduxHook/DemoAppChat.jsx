import React, { useRef } from 'react'
//hook react-redux
import { useDispatch, useSelector } from 'react-redux'
import { addCommentAction } from '../../../redux/reducer/appChatReducer';


const DemoAppChat = () => {

    // const arrComment = useSelector(state => state.appChatReducer.arrComment)
    const { arrComment } = useSelector(state => state.appChatReducer); //bóc tách phần tử chỉ cần :phần tử rồi "."
    const dispatch = useDispatch();

    const useComment = useRef({
        name: '',
        content: ''

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('useComment.current', useComment.current);

        // Đưa dữ liệu form lên redux
        const action = addCommentAction(useComment.current);
        //gửi dữ liệu lên reducer
        dispatch(action);
    }


    const handleChange = (e) => {
        const { id, value } = e.target;

        useComment.current[id] = value;
    }
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header">
                    {arrComment.map((comment, index) => {
                        return <div className="row ">
                            <div className="col-2">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxKK1KGfZt4TOdSYrhvmAEYhZu0C999M_gg&usqp=CAU" alt="" style={{ height: 100 }} />
                            </div>
                            <div className="col-10">
                                <h3 className='text-danger'>{comment.name}</h3>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    })}
                    <div className="row mt-2">
                        <div className="col-2">
                            <img src="https://i.pinimg.com/236x/23/af/0f/23af0fa636212b0d0e9d4cd0cf579645.jpg" alt="" style={{ height: 100 }} />
                        </div>
                        <div className="col-10">
                            <h3 className='text-danger'>Họ Tên</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore obcaecati neque dolore reiciendis autem id, doloremque enim consequuntur omnis, aliquam alias, nobis sint laboriosam. Ab tempore dolore laudantium repudiandae corporis.</p>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="form-group">
                        <p>Name </p>
                        <input id='name' className='form-control' onInput={handleChange} />
                    </div>
                    <div className="form-group">
                        <p>Content </p>
                        <input id='content' className='form-control' onInput={handleChange} />
                    </div>
                    <div className="form-group mt-2">
                        <button className='btn btn-dark' type='submit'>Send</button>
                    </div>
                </div>
            </div>


        </form>
    )
}

export default DemoAppChat