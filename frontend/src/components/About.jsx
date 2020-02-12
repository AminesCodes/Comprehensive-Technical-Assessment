import React from 'react'

export default function About (props) {

    return(
        <div className='container mt-5'>
            <h2 className='text-center'>About</h2>
            <h3 className='text-center m-5'>TV Show WatchList App</h3>
            <p>TV Show WatchList is an app designed to helps people decide what to watch next, 
                mostly by reading comments on a selected show or just by referring to how many users 
                have watched it.
            </p>
            <br />
            <br />
            <br />
            {/* <h5 className='float-left mt-3'></h5> */}
            <h6 className='float-right mt-3 text-right'>Developed by Amine</h6>
        </div>
    )
}