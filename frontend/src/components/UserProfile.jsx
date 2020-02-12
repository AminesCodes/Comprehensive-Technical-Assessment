import React from 'react'
import axios from 'axios'

import Feedback from './Feedback'
import UserCard from './UserCard'
import ShowThumbnail from './ShowThumbnail'

export default class UserProfile extends React.PureComponent {
state = {
    username: '',
    userId: 0,
    avatarUrl: '',
    showsList: [],
    networkErr: null,
}

getUserProfile = async(userId) => {
    try {
        const promises = []
        promises.push(axios.get(`/api/users/${userId}`))
        promises.push(axios.get(`/api/shows/user/${userId}`))
        const [ user, showsList ] = await Promise.all(promises)
        
        this.setState({
            username: user.data.payload.username,
            userId: user.data.payload.id,
            avatarUrl: user.data.payload.avatar_url,
            showsList: showsList.data.payload
        })
    } catch (err) {
        this.setState({ networkErr: err })
    }
}

componentDidMount() {
    const userId = (this.props.match.url).split('/')[2]
    if (!isNaN(parseInt(userId)) && parseInt(userId)+'' === userId+'') {
        this.getUserProfile(userId)
    }
}

hideFeedbackDiv = () => {
    this.setState({networkErr: null})
}
    
render() {
    if (this.state.networkErr) {
        return < Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
    }

    let userCard = null
    if (this.state.username) {
        userCard = <UserCard 
                        userId={this.state.userId}
                        username={this.state.username} 
                        avatarUrl={this.state.avatarUrl}
                    />
    }
    return(
        <div className=''>
            {userCard}
            <div className='container'>
                {this.state.showsList.map(show => 
                    <ShowThumbnail 
                        key={show.title + show.img_url}
                        title={show.title}
                        imageUrl={show.img_url}
                        genre={show.genre_name}
                        showId={show.show_id}
                        genreId={show.genre_id}
                        userId={this.state.userId}
                    />
                )}
            </div>
        </div>
    )
}
}