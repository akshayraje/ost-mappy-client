import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import List from './components/List';
import Header from './components/Header';
import TxDetails from './components/TxDetails';
import CustomData from './components/CustomData';
import Devices from './components/Devices';
import Token from './components/Token';
import AuthService from './services/AuthService';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.getAuthStatus() ? (
          <React.Fragment>
            <Header />
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Component {...props} />
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const App = () => (
  <HashRouter basename={window.location.pathname}>
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/users" component={List} />
      <PrivateRoute path="/user/:userId" component={TxDetails} />
      <PrivateRoute path="/devices" component={Devices} />
      <PrivateRoute path="/custom-transactions" component={CustomData} />
      <PrivateRoute path="/token" component={Token} />
    </React.Fragment>
  </HashRouter>
);

export default App;
