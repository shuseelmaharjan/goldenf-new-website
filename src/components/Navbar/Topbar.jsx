import React from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';


const Topbar = ({ toggleSidebar }) => {
    return (
    <>
      <div className="flex justify-between md:justify-end items-center p-4 shadow-md bg-white">
          <button className="md:hidden p-2 text-black" onClick={toggleSidebar}>
            <FaBarsStaggered />
          </button>
          <Username />
    </div>
    </>
  )
}

export default Topbar
