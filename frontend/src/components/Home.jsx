import React from 'react'

import LoginForm from './LoginForm'
import About from './About'

export default function Home (props) {
    let loggedUserId = 0
    if (props.loggedUser) {
        // loggedUserId = localStorage.getItem('#TV#$how@Watch&List#_UID') 
        loggedUserId = props.loggedUser.id
    }
    let form = null
    if (!loggedUserId) {
        form = <LoginForm
        handleFormSubmit={props.handleFormSubmit}
        formType={props.formType}
        handleTypeOfForm={props.handleTypeOfForm} 
        username={props.username} 
        handleInput={props.handleInput}
      />
    }

    return(
        <>
            <div className='text-center m-4 mx-auto'>
                {form}
            </div>
            <h2 className='text-center m-4 mx-auto'>Welcome to TV Show WatchList App</h2>
            <img 
                className='d-block w-75 mx-auto'
                src={require('../assets/Best-TV-Shows.jpg')} 
                alt='Multiple TV Shows images in one pic' 
            /> 
            <About />
        </>
    )
}