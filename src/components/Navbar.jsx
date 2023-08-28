import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
    
    
    <div>
<nav style={{background:"orange"}} className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
<h1 >React Movie App</h1>
<div ><button style={{background:"green", borderRadius:"20px", marginRight:"10px"}}  className="px-4 py-2">LOGIN</button>
<button style={{background:"green", borderRadius:"20px", marginRight:"10px"}}  className="px-4 py-2 mt-4">REGISTER</button>
<button style={{background:"green", borderRadius:"20px"}}  className="px-4 py-2 mt-4">LOGOUT</button></div>
</nav>
<div className="bg-slate-400">
<form className='flex justify-center'>
  <input className="border border-gray-950 text-black " type='text'
    placeholder='Search Movie'
  />
  <submit className="bg-slate-500 text-white p-4" >Search</submit>
</form>



</div>
</div>



</div>
  )
}

export default Navbar
