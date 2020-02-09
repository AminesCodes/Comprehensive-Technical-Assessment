import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowThumbnail (props) {
    const imageStyle = {
        margin: '5px',
        // display: 'block',
        width: '100px',
        height: '100px',
        objectFit: 'scale-down',
        borderRadius: '10px',
        border: 'solid black 1px',
    }
    return (
        <div className='card m-3 text-center'>
            <div className='card-img-top d-flex align-items-center bg-light'>
                <Link to={`/shows/${props.showId}`}>
                    <img className='img-fluid' src={props.imageUrl} alt={`${props.title}`} style={imageStyle}/>
                </Link>
                <div className='col p-2 m-0'>
                    <Link to={`/shows/${props.showId}`}>
                        <h4>{props.title}</h4>
                    </Link>
                    <Link to={`/genres/${props.genreId}`}>
                        <h5 className='text-right'>{props.genre}</h5>
                    </Link>
                </div>
            </div>
        </div>
    )
}