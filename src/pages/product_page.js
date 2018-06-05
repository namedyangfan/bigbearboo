import React from 'react'
import * as HomeProductsApi from 'api/home_products'
import ProductOverview from 'components/product/product_overview'

var HtmlToReactParser = require('html-to-react').Parser;

export default class ProductPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product_id: null,
    }
  }

  componentDidMount(){
    const params = {product_id: this.props.match.params.id}
    console.log('DIDMOUNT' + JSON.stringify(params))
    HomeProductsApi.show(params)
    .then((response) => {
      console.log(response.data)
      this.setState({
        product: response.data
      })
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

   renderProductPicture= () => {
    return(
      <div className="col s12 m7 l8 ">
        <div className="section">
          <div className="card-image">
            <img className="fit-card" src={this.state.product && this.state.product.picture} />
          </div>
        </div>
      </div>
    )
  }

  renderProductDetail = () => {
    var htmlInput = this.state.product && this.state.product.detail
    var htmlToReactParser = new HtmlToReactParser();
    var reactElement = htmlToReactParser.parse(htmlInput);
     
    return(
      <div className="col s12 m7 l8 detail-card">
        <div className="section">
          {reactElement}
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className="container product-page">
        <div className="row">
          {this.renderProductPicture()}
          <ProductOverview product={this.state.product}/>
        </div>
        <div className="row">
          {this.renderProductDetail()}
        </div>
      </div>
    )
  }
}