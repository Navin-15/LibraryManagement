import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
function TopBar() {
  return (
    <>
    <div className=" bg-danger">
        <Sidebar/> <Header/>
    </div>
    </>
  )
}

export default TopBar