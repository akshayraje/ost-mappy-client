import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import List from './components/List'

const App = () => (
  <Router>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Route exact path="/" component={List} />
        </div>
      </div>
    </div>
  </Router>
);

export default App;
