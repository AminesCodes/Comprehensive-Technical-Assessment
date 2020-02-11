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
            <div className='card-img-top d-flex align-items-center bg-light'>
                <Link to={`/shows/${props.title}`}>
                    <img className='img-fluid' src={props.imageUrl} alt={`${props.title}`} style={imageStyle}/>
                </Link>
                <div className='col p-2 m-0'>
                    <Link to={`/shows/${props.title}`}>
                        <h3>{props.title}</h3>
                    </Link>
                    <p>
                        Being watched by: {props.usersList.map((user, index) => 
                            <Link 
                                key={props.usersIds[index]+user+index} 
                                to={`/users/${props.usersIds[index]}`}
                            >{user} </Link>
                        )}
                    </p>
                    <h4 className='text-right'>
                        {props.genresNames.map((genre, index) => 
                            <Link 
                                key={props.genresIds[index]+genre+index} 
                                to={`/genres/${props.genresIds[index]}`}
                            >{genre} </Link>
                        )}
                    </h4>
                </div>
            </div>
        </div>
    )
}