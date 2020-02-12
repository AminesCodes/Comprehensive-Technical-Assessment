import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Feedback from './Feedback'
import ShowCard from './ShowCard'

export default function Genres (props) {
    const [genreList, setGenreList] = useState([])
    const [showsList, setShowsList] = useState([])
    const [networkErr, setNetworkErr] = useState(null)

    const getGenreList = async () => {
        try {
            const { data } = await axios.get('/api/genres')
            setGenreList(data.payload)
        } catch (err) {
            setNetworkErr(err)
        }
    }

    const getShowsList = async (genreId) => {
        try {
            const { data } = await axios.get(`/api/shows/genre/${genreId}`)
            setShowsList(data.payload)
        } catch (err) {
            setNetworkErr(err)
        }
    }

    const genreId = (props.match.url).split('/')[2]
    useEffect(() => {
        if (genreList.length === 0) {
            getGenreList()
        }
        if (genreId) {
            getShowsList(genreId)
        }
    }, [genreId])

    const hideFeedbackDiv = () => {
        setNetworkErr(null)
    }

    if (networkErr) {
        return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/>
    }

    return(
        <>
            <div className='container-sm-fluid text-center'>
                | {genreList.map((genre) => 
                    <Link 
                        key={genre.genre_name+genre.id+genre.genre_name}
                        to={`/genres/${genre.id}`}
                    > {genre.genre_name} | </Link>
                )}
            </div>
            <hr />
            {showsList.map((show, index) =>
                <ShowCard 
                    key={index+show.title+show.image_url[0]}
                    title={show.title}
                    imageUrl={show.image_url[0]}
                    usersList={show.usernames}
                    usersIds={show.users_ids}
                    genresIds={[show.genre_ids[0]]}
                    genresNames={[show.genre_names[0]]}
                />
            )}
        </>
    )
}