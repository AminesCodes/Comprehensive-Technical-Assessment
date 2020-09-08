import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowCard (props) {
    const imageStyle = {
        margin: '5px',
        // display: 'block',
        width: '100px',
        borderRadius: '10px',
    }

    return (
        <div className='card m-3 text-center'>
            <div className='card-img-top d-flex align-items-center showCard'>
                <Link to={`/shows/${props.title}`}>
                    <img className='img-fluid' src={props.imageUrl} alt={`${props.title}`} style={imageStyle}/>
                </Link>
                <div className='col p-2 m-0'>
                    <Link to={`/shows/${props.title}`}>
                        <h3>{props.title}</h3>
                    </Link>
                    <p>
                        Being watched by: {props.usersList.map((user, index) => 
                            <span key={props.usersIds[index]+user+index} >
                                <Link to={`/users/${props.usersIds[index]}`}> {user} </Link>
                                | 
                            </span>
                        )}
                    </p>
                    <h4 className='text-right'>
                        <Link to={`/genres/${props.genreId}`}>{props.genreName} </Link>
                    </h4>
                </div>
            </div>
        </div>
    )
}