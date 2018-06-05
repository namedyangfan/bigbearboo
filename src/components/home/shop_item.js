import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import _ from 'lodash'
import * as HomeProductsApi from 'api/home_products'
import {addItemNumber} from 'actions/current_user_item_numbers_actions'

class ProductCard extends React.Component {
  handleOnClick = () => {
    console.log('PRODUCTCARD ONCLICK')
    this.props.history.push(`/product/${this.props.product_id}`)
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

class ShopItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products    : null,
      numShopItem : 0
    };
  }

  componentDidMount(){
    HomeProductsApi.index()
    .then((response) => {
      console.log(response.data)
      this.setState({products: response.data})
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderProductCards = () => {
    return(
      _.map(this.state.products, (product) => 
        <ProductCard product={product} product_id={product.product_id} history={this.props.history}/>      
      )
    )
  }

  render() {
    return (
      <div className="shop-item">
        <div className="container">
          <div className="row">
            {this.renderProductCards()}
          </div>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      numberItems: state.numberItems,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItemNumber: (number) => {
            dispatch(addItemNumber(number));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem)
