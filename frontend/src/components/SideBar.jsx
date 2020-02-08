import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar(props) {
    
    return (
        <>
            <NavLink className='d-block m-2' to='/' > Home </NavLink>
            <NavLink className='d-block m-2' to='/users' > Users </NavLink>
            <NavLink className='d-block m-2' to='/shows' > Shows </NavLink>
            <NavLink className='d-block m-2' to='/about' > About </NavLink>
        </>
    )
}