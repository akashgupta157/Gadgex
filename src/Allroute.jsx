import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Dashboard from './Components/Dashboard'
import Products from './Components/Products'
export default function Allroute() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/admindashboard' element={<Dashboard/>} />
    <Route path='/product/:id' element={<Products/>} />
    </Routes>
    </>
  )
}
