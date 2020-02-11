import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Feedback from './Feedback'

export default function ShowForm(props) {
    const [showURL, setShowURL] = useState('')
    const [showName, setShowName] = useState('')
    const [showGenreId, setShowGenreId] = useState('0')
    const [genreList, setGenreList] = useState([])
    const [networkErr, setNetworkErr] = useState(null)

    useEffect(() => {
        getGenreList()
    }, [])

    const getGenreList = async () => {
        try {
            const { data } = await axios.get('/api/genres')
            setGenreList(data.payload)
        } catch (err) {
            setNetworkErr(err)
        }
    }

    const handleSubmitShowForm = async (event) => {
        event.preventDefault()
        
        if (showURL && showName && parseInt(showGenreId)) {
            try {
                const loggedUserId = localStorage.getItem('#TV#$how@Watch&List#_UID')
                const newShowInfo = { 
                    title: showName, 
                    img_url: showURL, 
                    user_id: loggedUserId, 
                    genre_id: showGenreId
                }
                
                await axios.post('/api/shows', newShowInfo)
                props.history.push({ pathname: `/users/${loggedUserId}`})

            } catch (err) {
                setNetworkErr(err)
            }
        }
    }

    const hideFeedbackDiv = () => {
        setNetworkErr(null)
    }

    if (networkErr) {
        return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/>
    }
    
    return (
        <>
            <h3>ADD SHOW</h3>
            <form onSubmit={handleSubmitShowForm}>
                <div className='form-group'>
                    <label>Show Image URL:
                        <input 
                            className='form-control' 
                            type='url' 
                            name='showURL'
                            value={showURL} 
                            onChange={e => setShowURL(e.target.value)}
                        />
                    </label>
                </div>

                <div className='form-group'>
                    <label>Show Name:
                        <input 
                            className='form-control' 
                            type='text' 
                            name='showName'
                            value={showName} 
                            onChange={e => setShowName(e.target.value)}
                        />
                    </label>
                </div>

                <div className='form-group'>
                    <label>Show Image URL:
                        <select 
                            className='form-control'
                            name='showType'
                            value={showGenreId} 
                            onChange={e => setShowGenreId(e.target.value)}
                        >
                            <option value='0'>Select Genre</option>
                            {genreList.map(genre => 
                                <option 
                                    key={genre.id+genre.genre_name} 
                                    value={genre.id}
                                >{genre.genre_name}</option>
                            )}
                        </select>
                    </label>
                </div>

                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </>
    )
}