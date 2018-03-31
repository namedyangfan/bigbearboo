import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
var classNames = require('classnames');


export default class Header extends Component {

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
          <ul className="navbar-nav mr-auto">
            <NavLink exact className="nav-item nav-link" to="/" activeClassName="active">Home</NavLink>
            <NavLink className="nav-item nav-link" to="/about" activeClassName="active">About</NavLink>
            <NavLink className="nav-item nav-link" to="/contact" activeClassName="active">Contact</NavLink>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <a class="btn btn-primary" href="#" role="button">
              <i className="material-icons left">shopping_cart</i> {this.props.numShopItem}
            </a>
            <NavLink className="nav-item nav-link" to="/login" activeClassName="active">login</NavLink>
          </ul>
        </div>
      </nav>
      );
  }
}
