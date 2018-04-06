import React from 'react'
import { Switch, Route } from 'react-router-dom'
import  Home  from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'
import LoginPage from './pages/login_page'
import RegisterPage from './pages/register_page'

const App_routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
    </Switch>
  </main>
)

export default App_routes
