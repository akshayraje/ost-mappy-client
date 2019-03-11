import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './components/List';
import Header from './components/Header';
import Details from './components/Details';
import CustomData from './components/CustomData';
import Devices from './components/Devices';

const App = () => (
  <Router>
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Route exact path="/" component={List} />
            <Route path="/user/:userId/tx" component={Details} />
            <Route path="/user/:userId/devices" component={Devices} />
            <Route path="/custom" component={CustomData} />
          </div>
        </div>
      </div>
    </React.Fragment>
  </Router>
);

export default App;
