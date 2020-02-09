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
    return (
        <Link to={`/users/${props.userId}`}>
            <div className='card m-3 text-center'>
                <div className='card-img-top d-flex align-items-center bg-light'>
                    <div>
                        <img className='img-fluid' src={props.avatarUrl} alt={`${props.username}'s avatar`} style={avatarStyle}/>
                    </div>
                    <h4 className='col p-2 m-0'>{props.username}</h4>
                </div>
            </div>
        </Link>
    )
}