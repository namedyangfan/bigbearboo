import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import _ from 'lodash'
import * as HomeProductsApi from 'api/home_products'
import HomePageLayout from 'layouts/home_page_layout'

class ItemCard extends React.Component {
  handleOnClick = () => {
    this.props.history.push(`/product/${this.props.product_id}`)
  }

  render(){
             
    //  <img src={this.props.product.picture}/>
    return(
        <div className="col s12 m6 l4 item-card">
          <div className="card large" onClick={this.handleOnClick}>
            <div className="product-card card-image" style={{backgroundImage: `url(${this.props.product.picture})`, backgroundSize: 'cover', backgroundPosition:'center'}}>
              <span className='card-title'>{this.props.product.price}</span>
            </div>
          </div>
        </div>
    )
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.getProducts(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id ){
      this.getProducts(nextProps.match.params.id)
    }
  }

  getProducts = (id) => {
    const params = { category_id: id }

    HomeProductsApi.indexCategory(params)
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
