import axios from 'axios'
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import {Link} from 'react-router-dom'
import Header from '.././components/header'

var classNames = require('classnames')

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email             : '',
      password          : '',
      loginSuccess      : false,
      loginErrorMessage : null
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.email != prevState.email ||
       this.state.password != prevState.password
      ){
      this.setState({loginErrorMessage:null})
    }
  }
  handleUserLogin = () => {
    const { email, password } = this.state;
    axios.post(`${process.env.PUBLIC_URL}auth/login`, {
      email    : email,
      password : password
    })
    .then((response) => {
      if (response.status === 200){
        this.setState({loginSuccess: true})
        console.log(response)
      } else {
        console.log (response)
      }
    })
    .catch((error) => {
      this.setState({loginErrorMessage: error.response.data.error})
    })
  }

  updateRegisterParameters = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderUserAccountInput = () => {
    return(
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">perm_identity</i>
          <input id="email" type="text" className="validate" name="email"
              value={this.state.email} onChange={this.updateRegisterParameters}/>
          <label htmlFor="email">E-mail</label>
        </div>
      </div>
      )
  }

  renderUserPasswordInput = () =>{
    return(
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">lock_outline</i>
          <input id="password" type="password" className="validate" name="password"
            value={this.state.password} onChange={this.updateRegisterParameters}/>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      )
  }

  renderRememberMe = () =>{
    return(
        <div className="input-field col s12 login-text">
          <p>
            <label>
              <input type="checkbox"/>
              <span>Remember me</span>
            </label>
          </p>
        </div>
      )
  }

  renderLoginButton = () =>{
    return(
      <div className="row">
        <div className="col s12">
          <a className="btn waves-effect waves-light col s12" onClick={this.handleUserLogin}>Login</a>
        </div>
      </div>
      )
  }

  renderRegisterButton = () =>{
    return(
      <div className="input-field col s6">
        <p className="margin">
          <Link to={"/register"}>Register Now</Link>
        </p>
      </div>
      )
  }

  renderHelpText(){
    if (!this.state.loginErrorMessage) return
    return (
        <div className="col s12">
          <ul>
            <li className="red-text">
              <i className="material-icons md-18 prefix">error</i>
              <span>{this.state.loginErrorMessage}</span>
            </li>
          </ul>
        </div>
      )
  }

  render() {
    if(this.state.loginSuccess){
      return( <Redirect to="/" /> )
    } else {
      return (
        <div>
          <Header/>
          <div className="container">
            <div className="row">
              <div className="col s6 z-depth-4 card-panel offset-s3">
                <div className="col s6 offset-s3">
                  <img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t31.0-8/10355539_887831341233354_8226884983048536509_o.jpg?_nc_cat=0&oh=96de39667c7fc17211039ee4fb7198e7&oe=5B319FCE"
                  alt="" className="circle responsive-img center-align" />
                </div>
                <form className="login-form">
                  {this.renderUserAccountInput()}
                  {this.renderUserPasswordInput()}
                  {this.renderRememberMe()}
                  {this.renderLoginButton()}
                  {this.renderHelpText()}
                  <div className="row">
                    {this.renderRegisterButton()}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
