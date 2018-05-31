import React from 'react'
import * as HomeProductsApi from 'api/home_products'

export default class ProductCard extends React.Component {
  handleOnClick = () => {
    console.log('PRODUCTCARD ONCLICK')
  }

  render(){
    return(
        <div className="col s12 m6 l4">
          <div className="card medium" onClick={this.handleOnClick}>
            <div className="product-card">
              <img src={this.props.product.picture}/>
            </div>
            <div className="card-content">
              <span>{this.props.product.name}</span>
            </div>
          </div>
        </div>
    )
  }
}