import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Main from '../pages/Main'
import Navbar from '../components/Navbar'


const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
             <Navbar/>
                 <Routes>
           <Route path="/" element={<Main/>} />
           {/* <Route path="/login" element={<Login/>} /> */}
                </Routes> 
         
        </BrowserRouter>
    </div>
  )
}

export default AppRouter