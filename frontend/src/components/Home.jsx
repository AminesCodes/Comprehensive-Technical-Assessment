import React from 'react'
import LoginForm from './LoginForm'

export default function Home (props) {
    const imageStyle = {
        width: '80%', 
        height: '80%', 
        display: 'block', 
        objectFit: 'scale-down',
        margin: 'auto'
    }

    const loggedUserId = localStorage.getItem('#TV#$how@Watch&List#_UID') 
    let form = null
    if (!loggedUserId) {
        form = <LoginForm
        handleFormSubmit={props.handleFormSubmit} 
        username={props.username} 
        handleInput={props.handleInput}
      />
    }

    return(
        <>
            {form}
            <img 
                src={require('../assets/Best-TV-Shows.jpg')} 
                alt='Multiple TV Shows images in one pic' 
                style={imageStyle}
            /> 
            <h2 className='text-center'>Welcome to TV Show WatchList App</h2>
        </>
    )
}