import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ShowCard from './ShowCard'
import Feedback from './Feedback'
import CommentCard from './CommentCard'

export default function ShowPage (props) {
    const [show, setShow ]= useState(null)
    const [comments, setComments] = useState([])
    const [networkErr, setNetworkErr] = useState(null)

    const getShowInfo = async (showTitle) => {
        try {
            const { data } = await axios.get(`/api/shows/show/${showTitle}`)
            const genres = removeDuplicates(data.payload.genre_names, data.payload.genre_ids)
            data.payload.genre_names = Object.keys(genres)
            data.payload.genre_ids = Object.values(genres)
            setShow(data.payload)
            
            const response = await axios.get(`/api/comments/shows/title/${showTitle}`)
            setComments(response.data.payload)

        } catch (err) {
            setNetworkErr(err)
        }
    }

    const removeDuplicates = (arr1, arr2) => {
        const tracker = {}
        for (let i=0; i<arr1.length; i++) {
            tracker[arr1[i]] = arr2[i]
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
        return < Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/>
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

                {comments.map(comment => 
                    <CommentCard 
                        key={comment.comment_body+comment.user_id+comment.avatar_url+comment.username}
                        userId={comment.user_id}
                        username={comment.username}
                        avatarUrl={comment.avatar_url}
                        comment={comment.comment_body}
                    />
                )}
            </>
        )
    }

    return <></>
}