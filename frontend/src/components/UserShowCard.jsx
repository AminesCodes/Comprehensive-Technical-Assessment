import React from 'react'
import { Link } from 'react-router-dom'

export default function UserShowCard (props) {
    const imageStyle = {
        margin: '5px',
        // display: 'block',
        width: '100px',
        height: '100px',
        objectFit: 'scale-down',
        borderRadius: '10px',
    }

    return (
        <div className='card m-3 text-center'>
            <div className='card-img-top d-flex align-items-center bg-light'>
                <Link to={`/shows/${props.showId}`}>
                    <h1>{props.title} of {props.username}</h1>
                    <img className='img-fluid' src={props.imageUrl} alt={`${props.title}`} style={imageStyle}/>
                </Link>
                <div className='col p-2 m-0'>
                    <Link to={`/genres/${props.genreId}`}>
                        <h4 className='text-right'>{props.genre}</h4>
                        <p><strong>{props.commentsCount}</strong> Comments</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}