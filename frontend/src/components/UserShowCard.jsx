import React from 'react'
import { Link } from 'react-router-dom'

export default function UserShowCard (props) {
    const imageStyle = {
        margin: '5px',
        width: '100%',
        borderRadius: '10px',
    }

    return (
        <div className='row'>
            <Link className='col-6 p-2 m-0' to={`/shows/${props.showId}`}>
                <img className='' src={props.imageUrl} alt={`${props.title}`} style={imageStyle}/>
            </Link>

            <div className='col-6 p-2 m-0 text-center'>
                <Link className='h3 d-block mt-5' to={`/shows/${props.showId}`}>
                    {props.title}
                </Link>
                <span>Posted by </span>
                <Link className='h3 d-block' to={`/users/${props.userId}`}>
                    {props.username}
                </Link>
                
                <Link className='h4 d-block mt-5' to={`/genres/${props.genreId}`}>
                    {props.genre}
                </Link>
                <p><strong>{props.commentsCount}</strong> Comments</p>
            </div>
        </div>
    )
}