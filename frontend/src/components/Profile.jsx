import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Feedback from './Feedback'

export default function Profile(props) {
    const [username, setUsername] = useState(props.loggedUser.username)
    const [avatarUrl, setAvatarUrl] = useState(props.loggedUser.avatar_url)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [updatePassword, setUpdatePassword] = useState(false)
    const [networkErr, setNetworkErr] = useState(null)
    
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const requestBody = {
                username,
                avatarUrl,
                password,
                newPassword,
            }
            if (password || (newPassword && confirmPassword && updatePassword && newPassword === confirmPassword)) {
                const { data } = await axios.put(`/api/auth/update/${props.loggedUser.id}`, requestBody)
                setPassword('')
                setNewPassword('')
                setConfirmPassword('')
                setUpdatePassword(false)
                console.log(data)
            } 

        } catch (err) {
            setNetworkErr(err)
        }
    }

    const deleteAccount = async () => {
        try {
            await axios.patch(`/api/auth/delete/${props.loggedUser.id}`)
            props.handleLogout()

        } catch (err) {
            setNetworkErr(err)
        }
    }
    
    const hideFeedbackDiv = () => {
        setNetworkErr(null)
    }

    if (networkErr) {
        return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/>
    }

    let passwordSubForm = null
    if (updatePassword) {
        passwordSubForm = <>
            <label className='mb-2 mr-sm-2 d-block'>New Password: 
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='password'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
            </label>
            
            <label className='mb-2 mr-sm-2 d-block' > Confirm Password
                <input 
                    className='form-control mb-2 mr-sm-2'
                    type='password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </label>
        </>
    }

    return (
        <div className='container w-75'>
            <form className='' onSubmit={handleFormSubmit}>
                <label className='mb-2 mr-sm-2 d-block'>Username: 
                    <input 
                        className='form-control mb-2 mr-sm-2'
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>

                <label className='mb-2 mr-sm-2 d-block'>Avatar URL: 
                    <input 
                    className='form-control mb-2 mr-sm-2'
                        type='url'
                        value={avatarUrl}
                        onChange={e => setAvatarUrl(e.target.value)}
                    />
                </label>
                
                <label className='mb-2 mr-sm-2 d-block'>Password: 
                    <input 
                        className='form-control mb-2 mr-sm-2'
                        type='password'
                        value={password}
                        placeholder='YOU MUST ENTER YOUR PASSWORD BEFORE SUBMITTING'
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                
                {passwordSubForm}

                <button className='btn btn-primary mb-2'>Submit</button>
                <label className='mb-2 mr-sm-2 d-block' className='mb-2 mr-sm-2'> Update Password 
                    <input type="checkbox" onChange={e => setUpdatePassword(e.target.checked)}/>
                </label>
            </form>

            <div className='text-right'>
                <button className='btn btn-danger mb-2' onClick={deleteAccount}>Delete Account</button>
            </div>
        </div>
    )
}