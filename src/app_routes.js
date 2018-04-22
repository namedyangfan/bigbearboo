import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import  Home  from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'
import LoginPage from './pages/login_page'
import RegisterPage from './pages/register_page'

var fakeAuth = {isAuthenticated : true}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const App_routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <PrivateRoute path="/protected" component={About}/>
    </Switch>
  </main>
)

export default App_routes
