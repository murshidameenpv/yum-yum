import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Main() {
  return (
      <div>
          <Navbar/>
          <Outlet/>
          <footer>FOOTER</footer>
    </div>
  )
}

export default Main