import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './components/List';
import Header from './components/Header';
import TxDetails from './components/TxDetails';
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
            <Route path="/user/:userId/ost-users" component={TxDetails} />
            <Route path="/user/:userId/devices" component={Devices} />
            <Route path="/custom" component={CustomData} />
          </div>
        </div>
      </div>
    </React.Fragment>
  </Router>
);

export default App;
