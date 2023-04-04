import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './JSX/Home'

export default function Allroute() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    </Routes>
    </>
  )
}
