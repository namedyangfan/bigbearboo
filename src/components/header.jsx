import axios from 'axios'
import React, { Component } from 'react';
import { NavLink, Link, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as authActions from 'actions/auth'
import _ from 'lodash'

var classNames = require('classnames');

class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      dropDownIsSelected: false
    }
  }

  logOutUser = (e) => {
    // delete token from the backend
    document.removeEventListener('click', this.handleOutsideClick, false)

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

  handleDropdownClick = (event) => {
    event.preventDefault()
    if (!this.state.dropDownIsSelected) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({dropDownIsSelected: !this.state.dropDownIsSelected})
  }

  handleOutsideClick = (e) => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleDropdownClick(e)
  }

  openCurrentOrder = (e) => {
    console.log('CURRENT ORDER')
    this.props.history.push(`/order`)
  }

  renderDropDown = () => {
    return(
      <div className="dropdown-root-container red accent-1" ref={node => { this.node = node}}>
        <div className="Dropdown-control" onClick={this.handleDropdownClick}>
          {_.capitalize(this.props.user_name)}
        </div>
        {
          this.state.dropDownIsSelected
            ? (
              <div className="Dropdown-menu">
                <NavLink className="Dropdown-option" to="/admin"
                  activeClassName="is-selected">Admin</NavLink>
                <div className="Dropdown-option" onClick={this.logOutUser}>Logout</div>
              </div>
              )
            : (null)
          }
      </div>
    )
  }

  renderNavigationItems() {
    if(this.props.isAuthenticated){
      return(
      <div>
        <ul id="nav-mobile" className="right">
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li>
            {this.renderDropDown()}
          </li>
          <li>
            <a className="waves-effect waves-light btn"  onClick={this.openCurrentOrder}>
              <i className="material-icons left">
                shopping_cart
              </i> {this.props.numberItems}
            </a>
          </li>
        </ul>
      </div>
      )
    }
    return(
      <ul id="nav-mobile" className="right">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
      </ul>
    )
  }

  render() {
    return(
      <nav>
        <div className="header nav-wrapper">
          <div className="container">
            <NavLink className="brand-logo left" to="/home">Logo</NavLink>
          </div>
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
      numberItems     : state.itemNumber.numberItems
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(authActions.authLogOut()),
    }
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Header ));