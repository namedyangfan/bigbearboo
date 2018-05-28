import React from 'react'
import axios from 'axios'
import NaonaoImage from '../.././images/naonao.jpg'
import { NavLink, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import _ from 'lodash'
import * as HomeProductsApi from 'api/home_products'
import {addItemNumber} from 'actions/current_user_item_numbers_actions'

class ProductCard extends React.Component {
  render(){
    return(
        <div className="col s12 m6 l4">
          <div className="card medium">
            <div className="test">
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
    console.log("PRODUCTSCARDS"+JSON.stringify(this.state.products))
    return(
      _.map(this.state.products, (product) => 
        <ProductCard product={product}/>      
      )
    )
  }

  render() {
    return (
      <div className="section">
        <div className="row">
          {this.renderProductCards()}
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
