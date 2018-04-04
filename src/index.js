import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { NavLink, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './stylesheets/main.scss';

var classNames = require('classnames');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
