import axios from 'axios'
import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import { NavLink, Link, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '.././actions/auth'
import _ from 'lodash'

var classNames = require('classnames');

class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      redirectMyOrders: false,
      redirectMyProfile: false
    }
  }

  logOutUser = () => {
    // delete token from the backend
    axios.delete(`${process.env.PUBLIC_URL}auth/logout`, {
      data: {
        user_id : this.props.user_id,
        token   : localStorage.getItem('token')
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
    // onLogOut clear the the token from localStorage and state
    this.props.onLogOut()
  }

  handleDropdownClick = (e) => {
    if(e.value == "Logout"){
      this.logOutUser()
    } else if (e.value == "My Profile"){
      this.setState({ redirectMyOrders:true })
      console.log ('handleDropdownClick' + e)
    } else {
      <NavLink to="/about" activeClassName="active">About</NavLink>
    }
  }

  renderNavigationItems() {
    console.log('@@@@@@@@')
    console.log('@@@@@@@@')
    console.log('@@@@@@@@')
    console.log('@@@@@@@@')
    console.log('header rendered')
    console.log(this.props)
    let options = ['My Profile', 'My Orders', 'Logout']

    if(this.props.isAuthenticated){
      return(

      <ul id="nav-mobile" className="right">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li>
          <Dropdown className = "dropdown-root-container" options={options} onChange={this.handleDropdownClick}
            placeholder={_.capitalize(this.props.user_name)} />
        </li>
        <li>
          <a className="btn waves-effect waves-light" type="button" onClick={this.logOutUser}>
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
    if (this.state.redirectMyOrders) { return (<Redirect to="/about" />) }
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
      user_name       : state.auth.user_name,
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Header ));
