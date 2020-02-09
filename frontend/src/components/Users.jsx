import React from 'react'
import { Link } from 'react-router-dom'
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
                        <Link to={`/users/${user.id}`} key={user.username+user.avatar_url+user.id} >
                            <UserCard 
                                userId={user.id}
                                username={user.username}
                                avatarUrl={user.avatar_url}
                            />
                        </Link>
                    )}
            </>
        )
    }
}