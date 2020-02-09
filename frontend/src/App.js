import React from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Users from './components/Users';
import About from './components/About';
import Home from './components/Home';
import Shows from './components/Shows';
import Feedback from './components/Feedback'

import UserProfile from './components/UserProfile'


class App extends React.PureComponent {
  state = {
    username: ''
  }

  handleLogUser = async () => {
    if (this.state.username) {
      const { data } = await axios.get('')
    }
  }

  render() {
    let pageContent = <Home />
    const loggedUserId = sessionStorage.getItem('#TV#$how@Watch&List_UID')
    if (loggedUserId) {
      pageContent = <Switch>
          <Route path='/users/:userId' component={UserProfile}></Route>
          <Route path='/users' component={Users}></Route>
          <Route path='/shows' component={Shows}></Route>
          <Route path='/about' component={About}></Route>
          <Route path='/' component={Home}></Route>
        </Switch>
    }

    return (
      <div className='container-fluid-md' style={{height: '100%'}}>
        
        <div className='row' style={{height: '10%', backgroundColor: 'orange'}}>
          <TopBar />
        </div>

        <div className='row' style={{height: '90%', backgroundColor: 'red'}}>

          <div className='col-2' style={{height: '100%', backgroundColor: 'beige'}}>
            <SideBar />
          </div>

          <div className='col-10 p-3 overflow-auto' style={{height: '100%', backgroundColor: 'lightblue'}}>
            {pageContent}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
