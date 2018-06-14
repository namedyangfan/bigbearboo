import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './stylesheets/main.scss';
import store from "./store";
import $ from 'jquery';
import * as _ from 'lodash';
import 'react-dropdown/style.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

window.jQuery = window.$ = $;
window._ = window.$ = $;

require('materialize-css/dist/js/materialize.js');
require('materialize-css/dist/css/materialize.min.css');


const app = (
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
