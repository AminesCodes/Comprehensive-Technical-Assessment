import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar(props) {
    return (
        <>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to='/' > Home </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link d-block m-2' to='/profile' > Profile </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/users' > Users </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/genres' > Genres </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/shows' > Shows </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/shows/add-show' > Add Show </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/about' > About </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='d-block m-2' to='/' onClick={props.handleLogout}> Logout </NavLink>
                </li>
            </ul>
        </>
    )
}