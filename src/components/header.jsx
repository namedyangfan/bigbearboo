import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
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
      <div>
        <nav>
          <div class="header nav-wrapper">
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="hide-on-med-and-down right">
              <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
              <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
              <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
              <li>
                <a className="btn waves-effect waves-light" type="button">
                  <i className="material-icons left">shopping_cart</i> {this.props.numShopItem}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      );
  }
}
