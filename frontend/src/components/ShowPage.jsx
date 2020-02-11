import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ShowCard from './ShowCard'
import Feedback from './Feedback'

export default function ShowPage (props) {
    const [show, setShow ]= useState(null)
    const [comments, setComment] = useState([])
    const [networkErr, setNetworkErr] = useState(null)

    const getShowInfo = async (showTitle) => {
        try {
            const { data } = await axios.get(`/api/shows/shows/${showTitle}`)
            const genres = removeDuplicates(data.payload.genre_names, data.payload.genre_ids)
            data.payload.genre_names = Object.keys(genres)
            data.payload.genre_ids = Object.values(genres)  
            console.log(data.payload)
            setShow(data.payload)

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

    useEffect(() => {
        const showTitle = (props.match.url).split('/')[2]
        getShowInfo(showTitle)
    }, [])

    const hideFeedbackDiv = () => {
        setNetworkErr(null)
    }

    if (networkErr) {
        return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/>
    }

    if (show) {
        return(
            <>
                <ShowCard 
                    title={show.title}
                    imageUrl={show.image_url[0]}
                    usersList={show.usernames}
                    usersIds={show.users_ids}
                    genresIds={show.genre_ids}
                    genresNames={show.genre_names}
                />
            </>
        )
    }

    return <></>
}