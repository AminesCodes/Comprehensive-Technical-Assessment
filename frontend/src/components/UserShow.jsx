import React from 'react'
import axios from 'axios'

import Feedback from './Feedback'
import Shows from './Shows'

export default class UserShow extends React.PureComponent{
    state = {
        showTitle: '',
        showImage: '',
        targetUsername: '',
        showComments: [],
        networkErr: null
    }

    getShowInfo = async (showId, userId) => {
        try {
            const promises = []
            promises.push(axios.get(`/api/shows/show/${showId}/${userId}`))
            promises.push(axios.get(`/api/comments/show/${showId}`))

            const [ show, comments ] = await Promise.all(promises)

            this.setState({
                showTitle: show.data.payload.title,
                showImage: show.data.payload.img_url,
                targetUsername: show.data.payload.username,
                showComments: comments.data.payload,
            })
            console.log(show.data.payload)
            console.log(comments.data.payload)
        } catch (err) {
            this.setState({ networkErr: err })
        }
    }

    componentDidMount() {
        const showId = (this.props.match.url).split('/')[2]
        const userId = (this.props.match.url).split('/')[3]
        this.getShowInfo(showId, userId)
    }

    hideFeedbackDiv = () => {
        this.setState({networkErr: null})
    }

    render() {
        if (this.state.networkErr) {
            return <Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
        }

        return(
            <div className='w-75 mx-auto mt-5'>
                user show
            </div>
        )
    }
}