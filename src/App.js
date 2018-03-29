import React from 'react';
import App_routes from "./app_routes"
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <App_routes />
  </BrowserRouter>
)

export default App
