import React from 'react';

class Header extends React.Component{
  render(){
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="nav-link" href="/">Home</a>
        </nav>
      </React.Fragment>

    )
  }
}

export default  Header;