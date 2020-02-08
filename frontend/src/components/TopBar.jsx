import React from 'react'

export default function TopBar(props) {
    
    return (
        <>
            <div className='col-3 d-sm-flex' style={{height: '50px'}}>
                <img src={require('../assets/film-solid.svg')} alt='App logo1' />
                {/* <img src={require('../assets/comment-regular.svg')} alt='App logo2' /> */}
            </div>
            <h3 className='col-9 text-center'>
                TV Show WatchList App
            </h3>
        </>
    )
}