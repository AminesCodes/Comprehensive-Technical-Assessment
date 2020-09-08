import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Feedback from './Feedback'
import ShowCard from './ShowCard'

export default function Shows (props) {
    const [showsList, setShowsList] = useState([])
    const [networkErr, setNetworkErr] = useState(null)

    useEffect(() => {
        getAllShows()
    }, [])

    const getAllShows = async () => {
        try {
            const { data } = await axios.get('/api/shows')
            setShowsList(data.payload)

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

    return(
        <>
            {showsList.map((show, index) =>
                <ShowCard 
                    key={index+show.title+show.image_url}
                    title={show.title}
                    imageUrl={show.img_url}
                    usersList={show.usernames}
                    usersIds={show.users_ids}
                    genreId={show.genre_id}
                    genreName={show.genre_name}
                />
            )}
        </>
    )
}