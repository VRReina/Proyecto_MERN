import React from 'react'
import { iconLogo } from "../../assets"
import { AdminMenu, Logout } from '../../components/Admin/AdminLayout'
import "./AdminLayout.scss"


export  function AdminLayout(props) {
    const {children} = props
  return (
    <div className='admin-layout'>
      <div className="admin-layout__left">
        <img src="/src/assets/svg/logoverde-small.svg" className="logo" />
        <AdminMenu/>
      </div>
      <div className="admin-layout__rigth">
        <div className="admin-layout__rigth-header">
          <Logout/>
        </div>
        <div className="admin-layout__rigth-content">{children}</div>
       </div>  
    </div>
  )
}
