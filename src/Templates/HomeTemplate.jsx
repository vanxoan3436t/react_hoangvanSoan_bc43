import React from 'react'
import Header from '../components/Header'

//import outlet từ react router dom
import { Outlet } from 'react-router-dom'


export default function HomeTemplate() {
    return ( 
        <div>
             
               <Header />
            
          

            <div className='container' style={{ minHeight: '80vh' }}>
                <Outlet />
            </div>
            <footer className='bg-dark text-white text-center p-3 fs-3'>
                Hoàng văn Soạn
            </footer>
        </div>
    )
}
