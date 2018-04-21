import axios from 'axios'
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

  handleClick = () => {
    // axios.get(`${process.env.PUBLIC_URL}auth/user`, {
    //   params: {
    //     user_id    : 14,
    //     auth_token : 'WwimErchYGM3m7wDCzilyQ'
    //   }
    // })
    // .then((response) => {
    //     console.log(response)
    //     console.log("show")
    // })
    // .catch((error) => {
    //   console.log(error.response.data.errors)
    //   console.log("$$$")
    // })

    axios.delete(`${process.env.PUBLIC_URL}auth/logout`, {
      data: {
        user_id    : 13,
        auth_token : '1u2bWayBsu-43uc2MpFK-w'
      }
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  render() {
    return(
      <div>
        <nav>
          <div className="header nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="hide-on-med-and-down right">
              <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
              <li>
                <a className="btn waves-effect waves-light" type="button" onClick={this.handleClick}>
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
