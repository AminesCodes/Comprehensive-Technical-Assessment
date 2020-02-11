import React from 'react'

export default function LoginForm (props) {
    return(
        <form className='form-inline' onSubmit={props.handleFormSubmit}>
            <label className='mr-sm-2' htmlFor='comment'>
                <textarea 
                    className='form-control mb-2 mr-sm-1'
                    name='comment' 
                    id='comment'
                    maxLength='10000'
                    cols='50'
                    rows='5'
                    placeholder='Enter your comment here'
                    value={props.inputValue}
                    onChange={props.handleInput}
                />
            </label>
            <button className='btn btn-primary mb-2 mx-auto'>Submit</button>
        </form>
    )
}