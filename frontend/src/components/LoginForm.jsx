import React from 'react'

export default function LoginForm (props) {
    if (props.formType === 'login') {
        return(
            <form className='form-inline' onSubmit={props.handleFormSubmit}>
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='text' 
                    name='username'
                    placeholder='Enter your username to login'
                    value={props.inputValue}
                    onChange={props.handleInput}
                />
            
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='password' 
                    name='password'
                    placeholder='password'
                    value={props.inputValue}
                    onChange={props.handleInput}
                />
            
                <button className='btn btn-primary mb-2'>Login</button>
                <span className='mb-2 mx-2 mr-sm-2'>New User?
                    <span className='btn btn-link' onClick={() => props.handleTypeOfForm('sign-up')}>Sign up</span>
                </span>
            </form>
        )
    }
    return(
        <form className='form-inline' onSubmit={props.handleFormSubmit}>
            <input 
                className='form-control mb-2 mr-sm-2'
                type='text' 
                name='username'
                placeholder='Enter your username to login'
                value={props.inputValue}
                onChange={props.handleInput}
            />
            
            <input 
                className='form-control mb-2 mr-sm-2'
                type='password' 
                name='password'
                placeholder='password'
                value={props.inputValue}
                onChange={props.handleInput}
            />
           
            <input 
                className='form-control mb-2 mr-sm-2'
                type='url' 
                name='avatarUrl'
                placeholder='Avatar URL'
                value={props.inputValue}
                onChange={props.handleInput}
            />
            
            <button className='btn btn-primary mb-2'>Sign up</button>
            <span className='mb-2 mx-2 mr-sm-2'>Already a user?
                <span className='btn btn-link' onClick={() => props.handleTypeOfForm('login')}>Login</span>
            </span>
        </form>
    )
}