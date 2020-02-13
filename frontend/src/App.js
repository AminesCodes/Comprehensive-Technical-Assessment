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
import Profile from './components/Profile';



class App extends React.Component {
  state = {
    username: '',
    password: '',
    avatarUrl: '',
    formType: 'login',
    loggedUser: null,
    networkErr: null,
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/auth/isUserLoggedIn')
      this.setState({ loggedUser: data.payload })
    } catch (err) {
      if (err.response.data.message !== 'You need to be logged in') {
        this.setState({ networkErr: err })
      } 
    }
  }

  handleFormSubmit = async (event) => {
    event.preventDefault()

    const { username, password, avatarUrl, formType } = this.state
    if (username && password && formType === 'login') {
      try {
        const { data } = await axios.post(`/api/auth/login`, {username, password})
        this.setState({
          username: '',
          password: '',
          avatarUrl: '',
          loggedUser: data.payload,
        })
        // localStorage.setItem('#TV#$how@Watch&List#_UID', data.payload.id)
        this.props.history.push({ pathname: `/users/${data.payload.id}` })

      } catch (err) {
        this.setState({ networkErr: err })
      }
    } else if (username && password && avatarUrl && formType === 'sign-up') {
      try {
        const { data } = await axios.post(`/api/auth/signup`, {username, password, avatarUrl})
        this.setState({
          username: '',
          password: '',
          avatarUrl: '',
          loggedUser: data.payload,
        })
        this.props.history.push({ pathname: `/users/${data.payload.id}` })

      } catch (err) {
        this.setState({ networkErr: err })
      }
    }
  }

  handleTypeOfForm = (type) => {
    this.setState({formType: type})
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  hideFeedbackDiv = () => {
    this.setState({networkErr: null})
  }

  handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout')
      this.setState({
        username: '',
        password: '',
        avatarUrl: '',
        formType: 'login',
        loggedUser: null,
      })
    } catch (err) {
      this.setState({ networkErr: err })
    }
  }


  render() {
    const { loggedUser } = this.state
    if (this.state.networkErr) {
      return < Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
    }
      
    let pageContent = <Home 
        handleFormSubmit={this.handleFormSubmit} 
        formType={this.state.formType}
        handleTypeOfForm={this.handleTypeOfForm}
        inputValue={this.state.username} 
        handleInput={this.handleInput}
      />

    if (loggedUser) {
      pageContent = 
        <>
          <nav className='col-2 sideBar'>
            <SideBar handleLogout={this.handleLogout}/>
          </nav>

          <div className='col-10 p-3 overflow-auto mainContent'>
            <Switch>
              <Route path='/users/:userId' render={routeProps => 
                <UserProfile loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/users' render={routeProps => 
                <Users loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/profile' render={routeProps => 
                <Profile loggedUser={loggedUser} handleLogout={this.handleLogout} {...routeProps} />} >
              </Route>
              <Route path='/show/:showId/user/:userId' render={routeProps => 
                <UserShow loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/shows/add-show' render={routeProps => 
                <ShowForm loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/shows/:showName' render={routeProps => 
                <ShowPage loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/shows' render={routeProps => 
                <Shows loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/genres/:genreId' render={routeProps => 
                <Genres loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/genres' render={routeProps => 
                <Genres loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/about' render={routeProps => 
                <About loggedUser={loggedUser} {...routeProps} />} >
              </Route>
              <Route path='/' render={routeProps => 
                <Home loggedUser={loggedUser} {...routeProps} />} >
              </Route>
            </Switch>
          </div>
        </>
    }

    return (
      <div className='container-fluid-md myApp'>
        
        <div className='row topBar'>
          <TopBar />
        </div>
        <div className='row mx-auto overflow-auto myPage'>
          {pageContent}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
