import React from 'react';
import App_routes from "./app_routes"
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import HomePageLayout from './layouts/home_page_layout'
import store from "./store";
import {Provider} from "react-redux";

const App = () => (
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <HomePageLayout>
          <App_routes />
        </HomePageLayout>
      </BrowserRouter>
    </Provider>
  </div>
)

export default App
