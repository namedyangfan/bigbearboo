import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import 'materialize-css';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './stylesheets/main.scss';
import store from "./store";

const app = (
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
