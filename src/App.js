import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import List from './components/List';
import Header from './components/Header';
import TxDetails from './components/TxDetails';
import CustomData from './components/CustomData';
import Devices from './components/Devices';
import OST_BT_USD_calculator from './components/OST_BT_USD_calculator';

const App = () => (
  <HashRouter basename={window.location.pathname}>
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Route exact path="/" component={List} />
            <Route path="/user/:userId/ost-users" component={TxDetails} />
            <Route path="/user/:userId/devices" component={Devices} />
            <Route path="/custom" component={CustomData} />
            <Route path="/calculator" component={OST_BT_USD_calculator} />
          </div>
        </div>
      </div>
    </React.Fragment>
  </HashRouter>
);

export default App;
