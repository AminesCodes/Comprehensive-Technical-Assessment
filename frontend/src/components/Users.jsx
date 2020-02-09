import React from 'react'
import axios from 'axios'

import Feedback from './Feedback'
import UserCard from './UserCard'

export default class Users extends React.PureComponent {
    state = {
        allUsers: [],
        networkErr: false,

    }

    getAllUsers = async() => {
        try {
            const { data } = await axios.get('/api/users')
            console.log(data.payload)
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
        if (this.state.networkErr) {
            return <Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
        }
        return(
            <>
                {this.state.allUsers.map(user =>
                        <UserCard 
                            key={user.username+user.avatar_url+user.id} 
                            userId={user.id}
                            username={user.username}
                            avatarUrl={user.avatar_url}
                        />
                    )}
            </>
        )
    }
}