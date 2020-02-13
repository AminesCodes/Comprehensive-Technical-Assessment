import React from 'react'
import axios from 'axios'

import Feedback from './Feedback'
import UserCard from './UserCard'

export default class Users extends React.PureComponent {
    state = {
        allUsers: [],
        networkErr: null,

    }

    getAllUsers = async() => {
        try {
            const { data } = await axios.get('/api/users')
            this.setState({allUsers: data.payload})
        } catch (err) {
            this.setState({networkErr: err})
        }
    }
    componentDidMount() {
        this.getAllUsers()
    }

    hideFeedbackDiv = () => {
        this.setState({networkErr: null})
    }

    render() {
        // const loggedUserId = parseInt(localStorage.getItem('#TV#$how@Watch&List#_UID'))
        let loggedUserId = 0
        if (this.props.loggedUser) {
            loggedUserId = this.props.loggedUser.id
        }

        if (this.state.networkErr) {
            return < Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
        }
        
        return(
            <>
                {this.state.allUsers.map(user =>
                    <UserCard 
                        key={user.username+user.avatar_url+user.id} 
                        userId={user.id}
                        username={user.username}
                        avatarUrl={user.avatar_url}
                        loggedUser={loggedUserId === user.id}
                    />
                )}
            </>
        )
    }
}