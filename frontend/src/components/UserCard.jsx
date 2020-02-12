import React from 'react'
import { Link } from 'react-router-dom'

export default function UserCard(props) {
    const avatarStyle = {
        margin: '5px',
        // display: 'block',
        width: '100px',
        height: '100px',
        objectFit: 'scale-down',
        borderRadius: '50%',
        border: 'solid black 1px',
    }

    let loggedBadge = null
    if (props.loggedUser) {
        loggedBadge = <span className='badge badge-pill badge-info m-3 p-2'>Logged-in</span>
    }

    return (
        <div className='card m-3 text-center'>
            <div className='card-img-top d-flex align-items-center userCard'>
                <Link to={`/users/${props.userId}`} >
                    <img className='img-fluid' src={props.avatarUrl} alt={`${props.username}'s avatar`} style={avatarStyle}/>
                </Link>
                <div className='col p-2 m-0'>
                    <Link to={`/users/${props.userId}`} >
                        <span className='h4'>{props.username}</span>
                    </Link>
                </div>
                    {loggedBadge}
            </div>
        </div>
    )
}