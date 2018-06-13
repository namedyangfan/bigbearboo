import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import _ from 'lodash'
import * as HomeProductsApi from 'api/home_products'

class ItemCard extends React.Component {
  handleOnClick = () => {
    this.props.history.push(`/product/${this.props.product_id}`)
  }

  render(){
    return(
        <div className="col s12 m4 l3 item-card">
          <div className="card medium" onClick={this.handleOnClick}>
            <div className="product-card">
              <img src={this.props.product.picture}/>
            </div>
          </div>
        </div>
    )
  }
}

export default class ShopItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products    : null,
    };
  }

  componentDidMount(){
    HomeProductsApi.index()
    .then((response) => {
      this.setState({products: response.data})
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderItemCards = () => {
    return(
      _.map(this.state.products, (product) => 
        <ItemCard product={product} product_id={product.product_id} history={this.props.history}/>      
      )
    )
  }

  render() {
    return (
      <div className="shop-item grey lighten-4">
        <div className="container">
          <div className="row">
            {this.renderItemCards()}
          </div>
        </div>
      </div>
      );
  }
}
