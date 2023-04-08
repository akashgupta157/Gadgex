import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './JSX/Home'
import Cart from './JSX/Cart'
import Admin from './JSX/Admin'
import Dashboard from './JSX/Dashboard'
export default function Allroute() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/admin' element={<Admin/>} />
    <Route path='/admindashbord' element={<Dashboard/>} />
    </Routes>
    </>
  )
}
