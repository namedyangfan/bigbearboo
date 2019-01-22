import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return(
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l3 m4 s12">
                  <a href="https://github.com/namedyangfan/bigbearboo" className="btn footer-button">
                    <i className="fab fa-github fa-5x footer-icon left"></i> 
                    see code
                  </a>
            </div>
            <div className="col l3 m4 s12">
                  <a href="https://www.linkedin.com/in/fanyangcanada/" className="btn footer-button">
                    <i className="fab fa-linkedin fa-5x footer-icon left"></i>
                    Fan Yang
                  </a>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
            © 2019 Copyright
            </div>
          </div>
      </footer>
      );
  }
}
