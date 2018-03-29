import React from 'react'
import { Switch, Route } from 'react-router-dom'
import  Home  from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'

const App_routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
    </Switch>
  </main>
)

export default App_routes
