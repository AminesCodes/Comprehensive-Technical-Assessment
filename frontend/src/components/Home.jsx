import React from 'react'

export default function Home (props) {
    const imageStyle = {
        width: '80%', 
        height: '80%', 
        display: 'block', 
        objectFit: 'scale-down',
        margin: 'auto'
    }
    return(
        <>
            <img 
                src={require('../assets/Best-TV-Shows.jpg')} 
                alt='Multiple TV Shows images in one pic' 
                style={imageStyle}
            /> 
            <h2 className='text-center'>Welcome to TV Show WatchList App</h2>
        </>
    )
}