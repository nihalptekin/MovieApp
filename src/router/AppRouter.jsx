import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Main from '../pages/Main'
import Navbar from '../components/Navbar'
import Register from '../pages/Register'
import MovieDetail from '../pages/MovieDetail'
import Login from '../pages/Login'


const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
             <Navbar/>
                 <Routes>
                <Route path="/" element={<Main/>} />  
                <Route path="/login" element={<Login/>} /> 
                <Route path="/register" element={<Register/>} />
                {/* detailsten sonra ne gelirse gelsin detail sayfasinda render et. bunun icin /: yapariz. isim önemli degil biz id dedik */}
                <Route path="/details/:id" element={<MovieDetail />} />
                </Routes> 
         
        </BrowserRouter>
    </div>
  )
}

export default AppRouter