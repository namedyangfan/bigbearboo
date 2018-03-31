import React from 'react'
import axios from 'axios'
import NaonaoImage from '../.././images/naonao.jpg'
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
      this.setState({ data: _.slice(res.data,0,5) })
    })
  }

  renderItemCards(){
    var a= this.state.data.map((value) =>
      <div className="col-sm-4">
        <div className="card box-shadow h-5 d-inline-block text-center">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">{value.id}</h4>
          </div>
          <div className="card-body naonao">
            <h4 className="card-title">{value.title}</h4>
            <small className="text-muted">{value.body}</small>
            <img className="card-img-top mh-10" src={NaonaoImage} alt="Card image cap" />
            <button className="btn btn-primary" onClick={this.props.handleClick}>
              <i className="material-icons">add_shopping_cart</i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
    return(
      <div className="row">
        {a}
      </div>
      )
  }

  render() {
    return (
      <div className="container-fluid test">
          {this.renderItemCards()}
      </div>
      );
  }
}
