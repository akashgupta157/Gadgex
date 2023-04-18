import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Products() {
    const [data, setdata] = useState()
    const location =useLocation()
    fetch(`https://incandescent-nettle-pirate.glitch.me/products?category=${location.state.end}&_page=1&_limit=20`)
    .then(response => response.json())
    .then(data=>setdata(data))
  return (
    <div>

    </div>
  )
}
