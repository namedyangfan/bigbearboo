import React, { Component } from 'react';
import App_routes from "./app_routes"
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import HomePageLayout from './layouts/home_page_layout'

class App extends Component {
  render (){
    return(
      <div>
        <HomePageLayout>
          <App_routes />
        </HomePageLayout>
      </div>
    )
  }
}

export default withRouter(App)
