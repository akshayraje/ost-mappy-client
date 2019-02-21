import React, { Component } from 'react';
import Card from './components/Card'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-md-4">
            <Card title="My card" text="My card's text" buttonText="Click me!"/>
          </div>
          <div className="col-md-4">
            <Card title="My card" text="My card's text" buttonText="Click me!"/>
          </div>
          <div className="col-md-4">
            <Card title="My card" text="My card's text" buttonText="Click me!"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
