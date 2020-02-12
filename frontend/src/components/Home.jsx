import React from 'react'

import LoginForm from './LoginForm'
import About from './About'

export default function Home (props) {
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
            <h2 className='text-center m-4'>Welcome to TV Show WatchList App</h2>
            <img 
                className='d-block w-75 mx-auto'
                src={require('../assets/Best-TV-Shows.jpg')} 
                alt='Multiple TV Shows images in one pic' 
            /> 
            <About />
        </>
    )
}