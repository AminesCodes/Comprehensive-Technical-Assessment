import React from 'react';
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';
import axios from 'axios';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Users from './components/Users';
import About from './components/About';
import Home from './components/Home';
import Shows from './components/Shows';
import Feedback from './components/Feedback';

import UserProfile from './components/UserProfile';
import UserShow from './components/UserShow';


class App extends React.Component {
  state = {
    username: '',
    userId: 0,
    networkErr: null,
  }

  handleLogUser = async (event) => {
    event.preventDefault()

    if (this.state.username) {
      try {
        const { data } = await axios.get(`/api/users/${this.state.username}`)
        console.log(data.payload.id)
        localStorage.setItem('#TV#$how@Watch&List#_UID', data.payload.id)
        this.setState({ userId: data.payload.id})
        this.props.history.push({ pathname: `/users/${data.payload.id}` })
      } catch (err) {
        this.setState({ networkErr: err })
      }
    }
  }

  handleInput = event => {
    this.setState({ username: event.target.value})
  }

  hideFeedbackDiv = () => {
    this.setState({networkErr: null})
  }

  handleLogout = () => {
    localStorage.removeItem('#TV#$how@Watch&List#_UID')
    this.setState({
      username: '',
      userId: 0,
      networkErr: null,
    })
  }


  render() {
    let pageContent = <Home 
        handleLogUser={this.handleLogUser} 
        username={this.state.username} 
        handleInput={this.handleInput}
      />

      if (this.state.networkErr) {
        pageContent = <Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
      }
      
      
    const loggedUserId = localStorage.getItem('#TV#$how@Watch&List#_UID')
    if (loggedUserId && !this.state.networkErr) {
      pageContent = 
        <>
          <div className='col-2' style={{height: '100%', backgroundColor: 'beige'}}>
            <SideBar handleLogout={this.handleLogout}/>
          </div>

          <div className='col-10 p-3 overflow-auto' style={{height: '100%'}}>
            <Switch>
              <Route path='/users/:userId' component={UserProfile}></Route>
              <Route path='/users' component={Users}></Route>
              <Route path='/shows/:showId/:userId' component={UserShow}></Route>
              <Route path='/shows' component={Shows}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/' component={Home}></Route>
            </Switch>
          </div>
        </>
    }

    return (
      <div className='container-fluid-md' style={{height: '100%'}}>
        
        <div className='row' style={{height: '10%', backgroundColor: 'orange'}}>
          <TopBar />
        </div>
        <div className='row mx-auto' style={{height: '90%', backgroundColor: 'lightblue'}}>
          {pageContent}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
