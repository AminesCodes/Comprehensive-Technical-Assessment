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
            setShow(data.payload)
            
            const response = await axios.get(`/api/comments/shows/title/${showTitle}`)
            setComments(response.data.payload)

        } catch (err) {
            setNetworkErr(err)
        }
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
                    imageUrl={show.img_url}
                    usersList={show.usernames}
                    usersIds={show.users_ids}
                    genreId={show.genre_id}
                    genreName={show.genre_name}
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