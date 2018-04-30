import axios from 'axios'
import React, { Component } from 'react';
import { NavLink, Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '.././actions/auth'

var classNames = require('classnames');

class Header extends Component {

  constructor(props) {
    super();
    this.state = {
    }
  }

  handleClick = () => {
    // onLogOut clear the the token from localStorage and state
    this.props.onLogOut()

    // delete token from the backend
    axios.delete(`${process.env.PUBLIC_URL}auth/logout`, {
      data: {
        user_id    : this.props.user_id,
        auth_token : this.props.token
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderNavigationItems() {
    if(this.props.isAuthenticated){
      return(
      <ul id="nav-mobile" className="right">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Logout {this.props.user_id}</NavLink></li>
        <li>
          <a className="btn waves-effect waves-light" type="button" onClick={this.handleClick}>
            <i className="material-icons left">shopping_cart</i> {this.props.numberItems}
          </a>
        </li>
      </ul>
      )
    }
    return(
      <ul id="nav-mobile" className="right">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        <li>
          <a className="btn waves-effect waves-light" type="button" onClick={this.handleClick}>
            <i className="material-icons left">shopping_cart</i> {this.props.numberItems}
          </a>
        </li>
      </ul>
    )
  }

  render() {
    return(
      <nav>
        <div className="header nav-wrapper">
          <a href="#" className="brand-logo left">Logo</a>
          {this.renderNavigationItems()}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      token           : state.auth.token,
      user_id         : state.auth.user_id,
      isAuthenticated : state.auth.isAuthenticated,
      numberItems     : state.numberItems
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch( actions.authLogOut())
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Header );
