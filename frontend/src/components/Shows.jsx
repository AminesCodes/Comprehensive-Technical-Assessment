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
            for (let show of data.payload) {
                const genres = removeDuplicates(show.genre_names, show.genre_ids)
                show.genre_names = Object.keys(genres)
                show.genre_ids = Object.values(genres)  
            }
            setShowsList(data.payload)

        } catch (err) {
            setNetworkErr(err)
        }
    }

    const removeDuplicates = (arr1, arr2) => {
        const tracker = {}
        for (let i=0; i<arr1.length; i++) {
            if (!tracker[arr1[i]]) {
                tracker[arr1[i]] = arr2[i]
            }
        }
        return tracker
    }

    const hideFeedbackDiv = () => {
        setNetworkErr(null)
    }

    if (networkErr) {
        return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/>
    }

    if (showsList.length === 0) {
        return <></>
    }

    return(
        <>
            {showsList.map((show, index) =>
                <ShowCard 
                    key={index+show.title+show.image_url[0]}
                    title={show.title}
                    imageUrl={show.image_url[0]}
                    usersList={show.usernames}
                    usersIds={show.users_ids}
                    genresIds={show.genre_ids}
                    genresNames={show.genre_names}
                />
            )}
        </>
    )
}