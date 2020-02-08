import React from 'react';
import { Switch, Route } from 'react-router-dom'

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Users from './components/Users';
import About from './components/About';
import Home from './components/Home';
import Shows from './components/Shows';


class App extends React.PureComponent {

  render() {
    return (
      <div className='container-fluid-md' style={{height: '100%'}}>
        
        <div className='row' style={{height: '10%'}}>
          <TopBar />
        </div>

        <div className='row' style={{height: '90%', backgroundColor: 'red'}}>

          <div className='col-md-2' style={{height: '100%', backgroundColor: 'beige'}}>
            <SideBar />
          </div>

          <div className='col-md-10 p-3' style={{height: '100%', backgroundColor: 'lightblue'}}>
            <Switch>
              <Route path='/users' component={Users}></Route>
              <Route path='/shows' component={Shows}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/' component={Home}></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
