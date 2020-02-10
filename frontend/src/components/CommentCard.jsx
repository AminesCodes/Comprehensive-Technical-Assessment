import React from 'react'
import { Link } from 'react-router-dom'

export default function CommentCard (props) {
    const avatarStyle = {
        margin: '5px',
        display: 'block',
        width: '100px',
        height: '100px',
        objectFit: 'scale-down',
        borderRadius: '50%',
        border: 'solid black 1px',
    }
    
    return(
        <div className='card m-3 text-center'>
            <div className='card-img-top d-flex align-items-center bg-light'>
                <Link to={`/users/${props.userId}`} >
                    <img className='img-fluid' src={props.avatarUrl} alt={`${props.username}'s avatar`} style={avatarStyle}/>
                    <span>{props.username}</span>
                </Link>
                <div className='col p-2 m-0'>
                    <span className=''>{props.comment}</span>
                </div>
            </div>
        </div>
    )
}