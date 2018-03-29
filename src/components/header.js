import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
var classNames = require('classnames');


class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      HomeClass     : 'nav-item nav-link active',
    }
  }

  onChangeTab(tab){
    this.setState({
      HomeClass : classNames({
        'nav-item nav-link': true,
        'active' : tab == 'Home'
      })
    })
    console.log(this.state.HomeClass)
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink exact className="nav-item nav-link" to="/" activeClassName="active">Home</NavLink>
            <NavLink className="nav-item nav-link" to="/about" activeClassName="active">About</NavLink>
            <NavLink className="nav-item nav-link" to="/contact" activeClassName="active">Contact</NavLink>
          </div>
        </div>
      </nav>
      );
  }
}

export default Header;
