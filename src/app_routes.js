import React from 'react'
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from './actions/auth'

import  Home  from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'
import ProductPage from 'pages/product'
import LoginPage from './pages/login_page'
import RegisterPage from './pages/register_page'
import AdminPage from './pages/admin_page'
import AdminProductPage from './pages/admin_product_page'

var fakeAuth = {isAuthenticated : false}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname : '/login',
          state    : { from: props.location }
        }} />
  )} />
)

class App_routes extends React.Component {
  componentDidMount () {
    this.props.onValidateToken();
  }

  render() {
    return(
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/product/:id" component={ProductPage}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route exact path="/admin" component={AdminPage}/>
          <Route path="/admin/product/:id" component={AdminProductPage}/>
          <Redirect to="/" />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onValidateToken: () => dispatch( actions.authValidateToken() )
  };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( App_routes ))
