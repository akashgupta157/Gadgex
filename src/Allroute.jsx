import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './JSX/Home'
import Cart from './JSX/Cart'
import Dashboard from './JSX/Dashboard'
import Products from './JSX/Products'
export default function Allroute() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/admindashboard' element={<Dashboard/>} />
    <Route path='/product' element={<Products/>} />
    </Routes>
    </>
  )
}
