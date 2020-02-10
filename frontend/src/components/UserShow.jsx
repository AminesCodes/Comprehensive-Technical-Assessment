import React from 'react'
import axios from 'axios'

import Feedback from './Feedback'
import CommentCard from './CommentCard'
import CommentForm from './LoginForm'

export default class UserShow extends React.PureComponent{
    state = {
        showTitle: '',
        showImage: '',
        targetUsername: '',
        showComments: [],
        comment: '',
        networkErr: null
    }

    getShowInfo = async (showId, userId) => {
        try {
            const promises = []
            promises.push(axios.get(`/api/shows/show/${showId}/${userId}`))
            promises.push(axios.get(`/api/comments/show/${showId}`))

            const [ show, comments ] = await Promise.all(promises)
            console.log(show.data.payload)
            this.setState({
                showTitle: show.data.payload.title,
                showImage: show.data.payload.img_url,
                targetUsername: show.data.payload.username,
                showComments: comments.data.payload,
            })
        } catch (err) {
            this.setState({ networkErr: err })
        }
    }

    componentDidMount() {
        const showId = (this.props.match.url).split('/')[2]
        const userId = (this.props.match.url).split('/')[3]
        this.getShowInfo(showId, userId)
    }

    handleFormSubmit = async (event) => {
        event.preventDefault()
        console.log('submit comment')

        if (this.state.comment) {
            const requestBody = { 
                comment_body: this.state.comment, 
                user_id: localStorage.getItem('#TV#$how@Watch&List#_UID'), 
                show_id: (this.props.match.url).split('/')[2]
            }

            try {
                const { data } = await axios.post('/api/comments', requestBody)
                console.log(data)
            } catch (err) {
                this.setState({ networkErr: err })
            }
        }
    }

    handleInput = event => {
        this.setState({ comment: event.target.value})
    }

    hideFeedbackDiv = () => {
        this.setState({networkErr: null})
    }

    render() {
        if (this.state.networkErr) {
            return <Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
        }

        return(
            <div className='container'>
                <div className='container'>
                    show name 
                    show picture
                    show owner username
                </div>

                <div className='w-75 mx-auto mt-5'>
                    <CommentForm 
                        handleFormSubmit={this.handleFormSubmit}
                        handleInput={this.handleInput}
                        inputValue={this.state.comment}
                    />
                    {this.state.showComments.map(comment => 
                        <CommentCard 
                            key={comment.targetUsername+comment.title+comment.comment_body}
                            userId={comment.userId}
                            username={comment.username}
                            avatarUrl={comment.avatar_url}
                            comment={comment.comment_body}
                        />
                    )}
                </div>
            </div>
        )
    }
}