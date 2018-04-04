import React from 'react';
import App_routes from "./app_routes"
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <App_routes />
  </BrowserRouter>
)

export default App
