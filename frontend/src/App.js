import React from 'react';
import { Switch, Route } from 'react-router-dom'

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

class App extends React.PureComponent {

  render() {
    return (
      <div className='container-fluid-md'>

        <div className='row'>
          <TopBar />
        </div>

        <div className='row'>

          <div className='col-md-2'>
            <SideBar />
          </div>

          <div className='col-md-10'>
            <Switch>
              <Route></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
