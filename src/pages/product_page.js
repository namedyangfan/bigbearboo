import React from 'react'
import _ from 'lodash'
import * as HomeProductsApi from 'api/home_products'
import ProductOverview from 'components/product/product_overview'

var HtmlToReactParser = require('html-to-react').Parser;

class ProductPicture extends React.Component {
  render(){
    console.log('ProductPicture: ' + this.props.pictureDisplay)
    return(
      <div className="col s12 m6 l7 ">
        <div className="section">
          <div className="card-image">
            <img className="fit-card" src={this.props.pictureDisplay} />
          </div>
        </div>
      </div>
    )
  }
}

export default class ProductPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product_id: null,
    }
  }

  componentDidMount(){
    const params = { product_id: this.props.match.params.id }
    HomeProductsApi.show(params)
    .then((response) => {
      if(_.isEmpty(response.data.attributes)){
        this.setState({
          product: response.data,
          pictureDisplay: response.data.picture,
        })
      } else {
        this.setState({
          product: response.data,
          pictureDisplay: _.head(response.data.attributes).picture,
          selectedVarianceId: _.head(response.data.attributes).product_attribute_id
        })
      }

    })
    .catch((error) => {
      console.log('ERROR:' + error.response)
    })
  }

  handleSelectVariance = (variance) => {
    if (variance.product_attribute_id != this.state.selectedVarianceId){
      this.setState({
        pictureDisplay: variance.picture,
        selectedVarianceId: variance.product_attribute_id
      })
    }
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
          <ProductPicture pictureDisplay={this.state.pictureDisplay}/>
          <ProductOverview product={this.state.product} handleSelectVariance={this.handleSelectVariance}
            selectedVarianceId={this.state.selectedVarianceId}/>
        </div>
        <div className="row">
          {this.renderProductDetail()}
        </div>
      </div>
    )
  }
}