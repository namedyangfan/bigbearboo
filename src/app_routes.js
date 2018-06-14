import React from 'react'
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from './actions/auth'

import  Home  from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'
import ProductPage from 'pages/product_page'
import LoginPage from './pages/login_page'
import RegisterPage from './pages/register_page'
import AdminPage from './pages/admin_page'
import AdminProductPage from './pages/admin_product_page'
import Order from 'pages/order_page'
import Category from 'pages/category_page'

const PrivateRoute = ({ component: Component, isAuthenticated,...rest }) => (
  <Route {...rest}
    render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname : '/login',
          state    : { from: props.location }
        }} />
  )} />
)

const PrivateAdminRoute = ({ component: Component, role,...rest }) => (
  <Route {...rest}
    render={(props) => (
    role === 'admin'
      ? <Component {...props} />
      : <Redirect to={{
          pathname : '/',
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
          <Route path='/category/:id' component={Category}/>
          <Route path="/about" component={About}/>
          <Route path="/product/:id" component={ProductPage}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <PrivateRoute path="/order" component={Order} isAuthenticated={this.props.isAuthenticated}/>
          <PrivateAdminRoute exact path="/admin" component={AdminPage} role={this.props.role}/>
          <PrivateAdminRoute path="/admin/product/:id" component={AdminProductPage} role={this.props.role}/>
          <Redirect to="/" />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.isAuthenticated,
    role            : state.auth.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onValidateToken: () => dispatch( actions.authValidateToken() )
  };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( App_routes ))
