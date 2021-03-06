import axios from 'axios'
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import _ from 'lodash'
import * as actions from '.././actions/auth'

var classNames = require('classnames');

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name                  : '',
      email                 : '',
      password              : '',
      password_confirmation : '',
      registerParams        : {},
      registerError         : false,
      errorMessage          : null
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.name != prevState.name ||
       this.state.email != prevState.email ||
       this.state.password != prevState.password ||
       this.state.password_confirmation != prevState.password_confirmation
      ){
      this.setState({registerError:false})
    }
  }

  updateRegisterParameters = (e) => {
    this.setState(
      _.assign(this.state.registerParams, {[e.target.name]: e.target.value})
    )
  }

  handleCreatUser = () => {
    if (_.isEmpty(this.state.registerParams)) return
    const registerParams = this.state.registerParams
    axios.post(`${process.env.PUBLIC_URL}auth/signup`, {
      registerParams
    })
    .then((response) => {
      this.props.onAuth(registerParams.email, registerParams.password)
    })
    .catch((errors) => {
      this.setState({
        errorMessage  : errors.response.data.errors,
        registerError : true
      })
    })
  }

  renderEnterName = () => {
    return(
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">perm_identity</i>
            <input id="name" type="text" className="validate" name="name"
              value={this.state.name} onChange={this.updateRegisterParameters}/>
            <label htmlFor="name">Your Name</label>
          </div>
        </div>
      )
  }

  renderEnterEmail = () =>{
    return(
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">mail_outline</i>
          <input id="email" type="email" className="validate" name="email"
            value={this.state.email} onChange={this.updateRegisterParameters}/>
          <label htmlFor="email">E-mail</label>
        </div>
      </div>
      )
  }

  renderEnterPassword = () =>{
    return(
      <div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock_outline</i>
            <input id="password" type="password" className="validate" name="password"
              value={this.state.password} onChange={this.updateRegisterParameters}/>
            <label htmlFor="password">Password</label>
          </div>
        </div>
         <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock_outline</i>
            <input id="password_2" type="password" className="validate" name="password_confirmation"
              value={this.state.password_confirmation} onChange={this.updateRegisterParameters}/>
            <label htmlFor="password_2">Password again</label>
          </div>
        </div>
      </div>
      )
  }

  renderHelpText(){
    if (!this.state.registerError || !this.state.errorMessage) return
    const l = this.state.errorMessage.map((value)=>
      <li className="red-text">
        <i className="material-icons md-18 prefix">error</i>
        <span>{value}</span>
      </li>
    )
    return (
        <div className="col s12">
          <ul>
            {l}
          </ul>
        </div>
      )
  }

  renderJoinNowButton = () =>{
    return(
      <div className="row">
        <div className="col s12">
          <a className="btn waves-effect waves-light col s12" onClick={this.handleCreatUser}>Join Now</a>
        </div>
      </div>
      )
  }

  render() {
    if(this.props.isAuthenticated){
      return( <Redirect to="/" /> )
    } else {
      return(
        <div className="container">
          <div className="row">
            <div className="col s6 z-depth-4 card-panel offset-s3">
              <div className="col s6 offset-s3">
                <img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t31.0-8/10355539_887831341233354_8226884983048536509_o.jpg?_nc_cat=0&oh=96de39667c7fc17211039ee4fb7198e7&oe=5B319FCE"
                alt="" className="circle responsive-img center-align" />
              </div>
              <form className="col s12">
                {this.renderEnterName()}
                {this.renderEnterEmail()}
                {this.renderEnterPassword()}
              </form>
                {this.renderHelpText()}
                {this.renderJoinNowButton()}
            </div>
          </div>
        </div>
      )
    }
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
        onAuth: ( email, password) => dispatch( actions.auth( email, password) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( RegisterPage )
