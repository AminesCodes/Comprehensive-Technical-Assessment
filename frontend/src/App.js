import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import axios from 'axios';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Users from './components/Users';
import About from './components/About';
import Home from './components/Home';
import Shows from './components/Shows';
import Feedback from './components/Feedback';
import ShowForm from './components/ShowForm'
import UserProfile from './components/UserProfile';
import UserShow from './components/UserShow';
import ShowPage from './components/ShowPage';
import Genres from './components/Genres'



class App extends React.Component {
  state = {
    username: '',
    networkErr: null,
  }

  handleFormSubmit = async (event) => {
    event.preventDefault()

    if (this.state.username) {
      try {
        const { data } = await axios.get(`/api/users/${this.state.username}`)
        localStorage.setItem('#TV#$how@Watch&List#_UID', data.payload.id)
        this.props.history.push({ pathname: `/users/${data.payload.id}` })

      } catch (err) {
        this.setState({ networkErr: err })
      }
    }
  }

  handleSubmitShowForm = async (event) => {
    event.preventDefault()

  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value})
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
    if (this.state.networkErr) {
      return < Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
    }
      
    let pageContent = <Home 
        handleFormSubmit={this.handleFormSubmit} 
        inputValue={this.state.username} 
        handleInput={this.handleInput}
      />

    const loggedUserId = localStorage.getItem('#TV#$how@Watch&List#_UID')
    if (loggedUserId) {
      pageContent = 
        <>
          <nav className='col-2 sideBar'>
            <SideBar handleLogout={this.handleLogout}/>
          </nav>

          <div className='col-10 p-3 overflow-auto mainContent'>
            <Switch>
              <Route path='/users/:userId' component={UserProfile}></Route>
              <Route path='/users' component={Users}></Route>
              <Route path='/show/:showId/user/:userId' component={UserShow}></Route>
              <Route path='/shows/add-show' component={ShowForm}></Route>
              <Route path='/shows/:showName' component={ShowPage}></Route>
              <Route path='/shows' component={Shows}></Route>
              <Route path='/genres/:genreId' component={Genres}></Route>
              <Route path='/genres' component={Genres}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/' component={Home}></Route>
            </Switch>
          </div>
        </>
    }

    return (
      <div className='container-fluid-md myApp'>
        
        <div className='row topBar'>
          <TopBar />
        </div>
        <div className='row mx-auto myPage'>
          {pageContent}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
