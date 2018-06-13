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

  handleClickCatagory = (e) => {
    console.log(e)
  }

  openCurrentOrder = (e) => {
    console.log('CURRENT ORDER')
    this.props.history.push(`/order`)
  }

  renderDropDown = () => {
    return(
      <div className="dropdown-root-container" ref={node => { this.node = node}}>
        <div className="Dropdown-control" onClick={this.handleDropdownClick}>
          <i class="material-icons left">account_circle</i>{_.capitalize(this.props.user_name)}
          <i className="material-icons right"> arrow_drop_down </i>
        </div>
        {
          this.state.dropDownIsSelected
            ? (
              <div className="Dropdown-menu">
                <NavLink className="Dropdown-option" to="/admin"
                  activeClassName="is-selected">Admin</NavLink>
                <div className="divider"></div>
                <a className="Dropdown-option" onClick={this.logOutUser}>Logout</a>
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
          <li>
            <NavLink exact to="/">
              <i className="material-icons left">home</i>Home
            </NavLink>
          </li>
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
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    )
  }

  renderCategoryTabs(){
    return(
      <div className="nav-content pink lighten-1">
        <div className="tabs tabs-transparent row">
          <div className="tab col offset-m1 offset-l4">
            <NavLink to="/category/1">BRIDES</NavLink>
          </div>
          <div className="tab">
            <NavLink to="/category/2">BRIDESMAIDS</NavLink>
          </div>
          <div className="tab">
            <NavLink to="/category/3">ACCESSORIES</NavLink>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return(
      <nav className="nav-extended">
        <div className="header nav-wrapper">
          <div className="container">
            <NavLink className="brand-logo left" to="/home">Logo</NavLink>
          </div>
          {this.renderNavigationItems()}
        </div>
        {this.renderCategoryTabs()}
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