import React from 'react';
import App_routes from "./app_routes"
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import HomePageLayout from './layouts/home_page_layout'
const App = () => (
  <BrowserRouter>
    <HomePageLayout>
      <App_routes />
    </HomePageLayout>
  </BrowserRouter>
)

export default App
