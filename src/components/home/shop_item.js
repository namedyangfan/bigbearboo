import React from 'react'
import axios from 'axios'
import NaonaoImage from '../.././images/naonao.jpg'
import { NavLink, Link } from 'react-router-dom'
import _ from 'lodash'

export default class ShopItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      numShopItem: 0
    };
  }
  componentWillMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      this.setState({ data: _.slice(res.data,0,20) })
    })
  }

  renderItemCards(){
    var a= this.state.data.map((value) =>
      <li className="col s3 clearfix::before">
        <div className="card">
          <div className="card-image">
            <img src={NaonaoImage} alt="Card image cap" />
            <span className="card-title">Naonao</span>
          </div>
          <div className="card-content">
            <span>Naonnao</span>
          </div>
          <div className="card-action">
            <Link to="/protected">
              <span className="btn waves-effect waves-light" onClick={this.props.handleClick}>
                <i className="material-icons">add_shopping_cart</i>
              </span>
            </Link>
          </div>
        </div>
      </li>
    );
    return(
      <ul className="row">
        {a}
      </ul>
      )
  }

  render() {
    return (
      <div className="container">
          {this.renderItemCards()}
      </div>
      );
  }
}
