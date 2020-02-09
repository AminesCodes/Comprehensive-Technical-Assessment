import React from 'react'

export default function LoginForm (props) {
    return(
        <form className='form-inline' onSubmit={props.handleLogUser}>
            <label className='mr-sm-2' htmlFor='username'>
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='text' 
                    name='username' 
                    id='username'
                    placeholder='Enter your username to login'
                    value={props.username}
                    onChange={props.handleInput}
                />
            </label>
            <button className='btn btn-primary mb-2'>Login</button>
        </form>
    )
}